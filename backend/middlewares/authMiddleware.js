const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Authorization token is required.' });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findOne({ _id: decoded.id }).lean();

    if (!user) {
      return res.status(401).send({ error: 'Invalid token. User not found.' });
    }

    // Attach user info to the request
    req.user = user;

    next();
  } catch (err) {
    console.error('Authentication Error:', err.message);
    res.status(401).send({ error: 'Authentication failed. Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
