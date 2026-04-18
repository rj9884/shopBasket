import express from 'express';
const router = express.Router();

export default (db, authenticateToken) => {

  router.use(authenticateToken);

  // POST /coupons/validate — validate a coupon code
  router.post('/validate', async (req, res) => {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Coupon code is required.' });
    }

    try {
      const [rows] = await db.execute('SELECT * FROM Coupons WHERE code = ?', [code]);

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Invalid coupon code.' });
      }

      const coupon = rows[0];
      
      // Check expiry date
      if (new Date(coupon.expiry_date) < new Date()) {
        return res.status(400).json({ error: 'Coupon has expired.' });
      }

      // Check usage limit
      if (coupon.usage_limit !== null) {
        const [[usageCount]] = await db.execute('SELECT COUNT(*) as count FROM Coupon_Usage WHERE coupon_id = ?', [coupon.coupon_id]);
        if (usageCount.count >= coupon.usage_limit) {
          return res.status(400).json({ error: 'Coupon usage limit reached.' });
        }
      }

      res.json({ message: 'Coupon applied successfully.', coupon });
    } catch (error) {
      console.error('DB error in POST /coupons/validate:', error.message);
      res.status(500).json({ error: 'Failed to validate coupon.' });
    }
  });

  return router;
};
