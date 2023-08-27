const jwt = require('jsonwebtoken');

// Middleware to protect routes that require authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'admin');
    req.user = decoded.user; // Store user information in the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authenticateJWT;
