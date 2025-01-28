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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both fields are required' });
  }

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
