// middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');

const checkRole = (...roles) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const userRole = decoded.role;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'You do not have permission to access this resource' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = checkRole;
