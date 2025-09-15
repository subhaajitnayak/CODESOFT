import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/user/me - get current user info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // The user object is already attached to the request by the middleware
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
