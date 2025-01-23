const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Mock user database
const users = [];

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword, role });

  // Create JWT token
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).send({ message: 'User registered successfully', token });
});

module.exports = router;
