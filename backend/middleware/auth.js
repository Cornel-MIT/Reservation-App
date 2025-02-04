const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Mock user database
const users = [];

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password, gender, cellNo, residentialAddress, dateOfBirth } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if the user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
        id: users.length + 1, // Simple ID generation
        username,
        email,
        password: hashedPassword,
        gender,
        cellNo,
        residentialAddress,
        dateOfBirth,
        role: 'user' // Default role
    };

    // Save user to the mock database
    users.push(newUser);

    // Create JWT token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with success message and token
    res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            gender: newUser.gender,
            cellNo: newUser.cellNo,
            residentialAddress: newUser.residentialAddress,
            dateOfBirth: newUser.dateOfBirth,
            role: newUser.role
        }
    });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Both fields are required' });
    }

    try {
        // Find user by email
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and user role
        res.json({
            token,
            role: user.role,
            user: {
                id: user.id,
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
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Profile Update Route (Edit all fields except email and password)
router.put('/profile', (req, res) => {
    const { id } = req.user; // Assuming the user is authenticated and their ID is in the JWT
    const { username, gender, cellNo, residentialAddress, dateOfBirth } = req.body;

    // Find user by ID
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields (skip email and password)
    user.username = username || user.username;
    user.gender = gender || user.gender;
    user.cellNo = cellNo || user.cellNo;
    user.residentialAddress = residentialAddress || user.residentialAddress;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    // Respond with updated user data
    res.json({
        message: 'Profile updated successfully',
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            cellNo: user.cellNo,
            residentialAddress: user.residentialAddress,
            dateOfBirth: user.dateOfBirth,
            role: user.role
        }
    });
});

module.exports = router;
