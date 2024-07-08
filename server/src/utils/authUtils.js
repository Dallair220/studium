// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};

module.exports = isAuthenticated;
