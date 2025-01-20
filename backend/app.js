const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const reservationRoutes = require('./routes/reservations');

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);

module.exports = app;
