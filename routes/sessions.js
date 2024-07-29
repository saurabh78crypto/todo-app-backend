import express from'express';
import Session from'../models/Session.js';
import authMiddleware from'../middleware/auth.js';
const router = express.Router();

router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
