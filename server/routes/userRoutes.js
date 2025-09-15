const express = require('express');
const router = express.Router();

// Assuming you have an auth middleware to protect routes
const { protect } = require('../middleware/authMiddleware'); 

const { 
    deleteUserAccount, 
    getUserProfile 
} = require('../controllers/userController');

// This route is likely already present for fetching user data
router.get('/me', protect, getUserProfile);

// New route for deleting the user's own account
router.delete('/me', protect, deleteUserAccount);

module.exports = router;