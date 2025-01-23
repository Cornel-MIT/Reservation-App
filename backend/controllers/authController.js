const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();

// Register User
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ username, password: hashedPassword, role: 'user' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: 'Failed to register user' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ error: 'Failed to log in' });
  }
};

// Assign Admin Role
const assignAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ username, password: hashedPassword, role: 'general_admin' });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: 'Failed to assign admin role' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { fullName, cellNo, otherProfileInfo } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, { fullName, cellNo, otherProfileInfo }, { new: true });
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: 'Failed to update profile' });
  }
};

module.exports = { registerUser, loginUser, assignAdmin, updateUserProfile };
