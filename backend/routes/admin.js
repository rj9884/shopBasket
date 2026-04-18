import express from 'express';
const router = express.Router();

export default (db, authenticateToken) => {

  router.use(authenticateToken);

  // GET /admin/top-products — fetch top selling products from view
  router.get('/top-products', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM Top_Products LIMIT 10');
      res.json(rows);
    } catch (error) {
      console.error('DB error in GET /admin/top-products:', error.message);
      res.status(500).json({ error: 'Failed to fetch top products.' });
    }
  });

  // GET /admin/stats — summary stats for admin dashboard
  router.get('/stats', async (req, res) => {
    try {
      const [[summaryStats]] = await db.execute('SELECT COUNT(*) AS total_users, IFNULL(SUM(total_spent), 0) AS total_revenue FROM User_Summary');
      const [[orderCount]] = await db.execute('SELECT COUNT(*) AS total_orders FROM Orders');

      res.json({
        total_users: summaryStats.total_users,
        total_orders: orderCount.total_orders,
        total_revenue: summaryStats.total_revenue
      });
    } catch (error) {
      console.error('DB error in GET /admin/stats:', error.message);
      res.status(500).json({ error: 'Failed to fetch admin stats.' });
    }
  });

  return router;
};