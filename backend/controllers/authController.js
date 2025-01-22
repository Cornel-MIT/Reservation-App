const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log('Request body:', req.body);  // Log the incoming data

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', existingUser);  // Log user existence check
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed password:', hashedPassword);  // Log the hashed password to confirm it's being hashed correctly

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,  // role could be 'user', 'admin', etc.
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log('New user saved:', savedUser);  // Log the saved user document

    // Generate a JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response
    res.status(201).json({
      message: 'User registered successfully!',
      token,
      userRole: savedUser.role,
    });
  } catch (error) {
    console.error('Error in user registration:', error);  // Log any errors
    res.status(500).json({ message: 'Server error' });
  }
};


// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token with user information (including role)
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
