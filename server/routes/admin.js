import express from 'express';
import requireAdmin from '../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Attempt from '../models/Attempt.js';
import User from '../models/User.js';

const router = express.Router();

// Get all users - admin only
router.get('/users', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/users/:id/promote', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isAdmin = true;
    await user.save();
    res.json({ message: 'User promoted to admin' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all attempts - admin only
router.get('/attempts', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const attempts = await Attempt.find().populate('user', 'username').sort({ attemptDate: -1 });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
