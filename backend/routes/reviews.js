import express from 'express';
const router = express.Router();

export default (db, authenticateToken) => {

  // GET /reviews/:product_id — fetch all reviews for a product
  router.get('/:product_id', async (req, res) => {
    const { product_id } = req.params;
    try {
      const [rows] = await db.execute(`
        SELECT r.review_id, r.rating, r.comment, r.created_at, u.username 
        FROM Reviews r
        JOIN Users u ON r.user_id = u.user_id
        WHERE r.product_id = ?
        ORDER BY r.created_at DESC
      `, [product_id]);
      res.json(rows);
    } catch (error) {
      console.error('DB error in GET /reviews:', error.message);
      res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
  });

  router.use(authenticateToken);

  // POST /reviews/add — insert a new review
  router.post('/add', async (req, res) => {
    const { product_id, rating, comment } = req.body;
    const user_id = req.user.user_id;

    if (!product_id || !rating) {
      return res.status(400).json({ error: 'product_id and rating are required.' });
    }

    try {
      await db.execute(
        'INSERT INTO Reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
        [product_id, user_id, rating, comment || null]
      );
      res.status(201).json({ message: 'Review added successfully.' });
    } catch (error) {
      console.error('DB error in POST /reviews/add:', error.message);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'You have already reviewed this product.' });
      }
      res.status(500).json({ error: 'Failed to add review.' });
    }
  });

  return router;
};
