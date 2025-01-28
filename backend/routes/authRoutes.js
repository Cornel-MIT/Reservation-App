const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/admin');

const router = express.Router();

// Register route for Users and Admins
// routes/authRoutes.js
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  // Log received request body
  console.log('Received Request: ', req.body);

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const userExists = await User.findOne({ email }) || await Admin.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = role === 'generalAdmin'
      ? new Admin({ username, email, password: hashedPassword, role })
      : new User({ username, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully!` });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received with email:', email);
  if (!email || !password) {
    return res.status(400).json({ message: 'Both fields are required' });
  }

  try {
    const user = await User.findOne({ email }) || await Admin.findOne({ email });
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

// Route for verifying the token
router.get('/verifyToken', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json({ id: decoded.id, role: decoded.role });
  });
});

module.exports = router;
