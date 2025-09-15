import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Attempt from '../models/Attempt.js';

const router = express.Router();

// @route   POST api/attempts
// @desc    Save a quiz attempt
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { score, correctCount, wrongCount, totalQuestions, quizId } = req.body;

    const newAttempt = new Attempt({
      user: req.user._id,
      score,
      correctCount,
      wrongCount,
      totalQuestions,
      quizId: quizId || 'general'
    });

    const attempt = await newAttempt.save();
    res.json(attempt);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Get attempts for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const attempts = await Attempt.find({ user: userId }).sort({ attemptDate: -1 });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
