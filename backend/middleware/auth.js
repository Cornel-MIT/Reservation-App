const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again later.',
});

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, gender, cellNo, residentialAddress, dateOfBirth } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user object
    const newUser = new User({
      username,
      email,
      password,
      gender,
      cellNo,
      residentialAddress,
      dateOfBirth,
    });

    // Save user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with success message and token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        cellNo: newUser.cellNo,
        residentialAddress: newUser.residentialAddress,
        dateOfBirth: newUser.dateOfBirth,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      role: user.role,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Profile Update Route (Edit all fields except email and password)
router.put('/profile', authenticateToken, async (req, res) => {
  const { id } = req.user; // ID is from the authenticated user
  const { username, gender, cellNo, residentialAddress, dateOfBirth } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields (skip email and password)
    user.username = username || user.username;
    user.gender = gender || user.gender;
    user.cellNo = cellNo || user.cellNo;
    user.residentialAddress = residentialAddress || user.residentialAddress;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    // Save the updated user
    await user.save();

    // Respond with updated user data
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        cellNo: user.cellNo,
        residentialAddress: user.residentialAddress,
        dateOfBirth: user.dateOfBirth,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
