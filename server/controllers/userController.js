const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // Assuming user model path
const Attempt = require('../models/attemptModel'); // Assuming attempt model path

/**
 * @desc    Get user profile
 * @route   GET /api/user/me
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is typically set by the 'protect' authentication middleware
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/user/me
 * @access  Private
 */
const deleteUserAccount = asyncHandler(async (req, res) => {
  // req.user is typically set by the 'protect' authentication middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  
  await Attempt.deleteMany({ userId: req.user.id });

  
  await user.deleteOne();

  res.status(200).json({ message: 'User account deleted successfully' });
});

module.exports = {
  getUserProfile,
  deleteUserAccount,
};