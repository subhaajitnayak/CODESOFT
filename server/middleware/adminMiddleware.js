// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  // This middleware should run *after* authMiddleware
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

export default requireAdmin;
