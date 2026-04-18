import express from 'express';
const router = express.Router();

export default (db, authenticateToken) => {

  router.use(authenticateToken);

  // GET /wishlist — fetch wishlist items for the logged-in user
  router.get('/', async (req, res) => {
    const user_id = req.user.user_id;
    try {
      const [rows] = await db.execute(`
        SELECT w.wishlist_id, p.product_id, p.name, p.price, p.image_url, c.name AS category
        FROM Wishlist w
        JOIN Products p ON w.product_id = p.product_id
        LEFT JOIN Categories c ON p.category_id = c.category_id
        WHERE w.user_id = ?
        ORDER BY w.added_at DESC
      `, [user_id]);
      res.json(rows);
    } catch (error) {
      console.error('DB error in GET /wishlist:', error.message);
      res.status(500).json({ error: 'Failed to fetch wishlist.' });
    }
  });

  // POST /wishlist/add — add product to wishlist
  router.post('/add', async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.user.user_id;

    if (!product_id) {
      return res.status(400).json({ error: 'product_id is required.' });
    }

    try {
      await db.execute(
        'INSERT IGNORE INTO Wishlist (user_id, product_id) VALUES (?, ?)',
        [user_id, product_id]
      );
      res.status(201).json({ message: 'Product added to wishlist.' });
    } catch (error) {
      console.error('DB error in POST /wishlist/add:', error.message);
      res.status(500).json({ error: 'Failed to add to wishlist.' });
    }
  });

  // DELETE /wishlist/remove — remove product from wishlist
  router.delete('/remove', async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.user.user_id;

    if (!product_id) {
      return res.status(400).json({ error: 'product_id is required.' });
    }

    try {
      await db.execute(
        'DELETE FROM Wishlist WHERE user_id = ? AND product_id = ?',
        [user_id, product_id]
      );
      res.json({ message: 'Product removed from wishlist.' });
    } catch (error) {
      console.error('DB error in DELETE /wishlist/remove:', error.message);
      res.status(500).json({ error: 'Failed to remove from wishlist.' });
    }
  });

  return router;
};
