import express from 'express';
const router = express.Router();

export default (db, authenticateToken) => {

  router.use(authenticateToken);

  // GET /addresses — fetch all addresses for the logged-in user
  router.get('/', async (req, res) => {
    const user_id = req.user.user_id;
    try {
      const [rows] = await db.execute(
        'SELECT * FROM Addresses WHERE user_id = ?',
        [user_id]
      );
      res.json(rows);
    } catch (error) {
      console.error('DB error in GET /addresses:', error.message);
      res.status(500).json({ error: 'Failed to fetch addresses.' });
    }
  });

  // POST /addresses/add — insert a new address
  router.post('/add', async (req, res) => {
    const { street, city, state, zip, country } = req.body;
    const user_id = req.user.user_id;

    if (!street || !city || !zip) {
      return res.status(400).json({ error: 'street, city, and zip are required.' });
    }

    try {
      const [result] = await db.execute(
        'INSERT INTO Addresses (user_id, street, city, state, zip, country) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, street, city, state || null, zip, country || 'USA']
      );
      res.status(201).json({ message: 'Address added successfully.', address_id: result.insertId });
    } catch (error) {
      console.error('DB error in POST /addresses/add:', error.message);
      res.status(500).json({ error: 'Failed to add address.' });
    }
  });

  return router;
};
