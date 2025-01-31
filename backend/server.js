const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Models
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  role: String
}));
const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
  name: String,
  place: String,
  hours: String,
  pictures: [String],
  reservationTypes: [String],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}));
const Reservation = mongoose.model('Reservation', new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  status: String
}));

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  console.log('Auth middleware called');
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log('User authenticated:', req.user);
    next();
  } catch (err) {
    console.log('Invalid token');
    res.status(401).send('Invalid Token');
  }
};
// Controllers and Routes
app.post('/api/restaurants', authMiddleware, async (req, res) => {
  console.log('CreateRestaurant function called');
  const { name, place, hours, pictures, reservationTypes } = req.body;
  const adminId = req.user.id;
  try {
    const restaurant = new Restaurant({
      name,
      place,
      hours,
      pictures,
      reservationTypes,
      admin: adminId,
    });
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
app.get('/api/restaurants', authMiddleware, async (req, res) => {
  console.log('GetRestaurants function called');
  try {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
app.post('/api/reservations', authMiddleware, async (req, res) => {
  console.log('CreateReservation function called');
  const { restaurant, user, date, time } = req.body;
  try {
    const reservation = new Reservation({
      restaurant,
      user,
      date,
      time,
      status: 'pending'
    });
    await reservation.save();
    res.status(201).send(reservation);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
app.get('/api/reservations', authMiddleware, async (req, res) => {
  console.log('GetReservations function called');
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
app.get('/api/reservations/restaurant/:restaurantId', authMiddleware, async (req, res) => {
  const { restaurantId } = req.params;
  console.log('GetReservationsForRestaurant function called');
  try {
    const reservations = await Reservation.find({ restaurant: restaurantId });
    res.send(reservations);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
app.patch('/api/reservations/approve/:reservationId', authMiddleware, async (req, res) => {
  const { reservationId } = req.params;
  console.log('ApproveReservation function called');
  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'approved' }, { new: true });
    res.send(reservation);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
app.patch('/api/reservations/decline/:reservationId', authMiddleware, async (req, res) => {
  const { reservationId } = req.params;
  console.log('DeclineReservation function called');
  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'declined' }, { new: true });
    res.send(reservation);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send(err);
  }
});
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Import routes
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes'); 
const adminRoutes = require('./routes/adminRoutes');

// Middleware
app.use(cors());

// Middleware to handle large JSON payloads and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api', adminRoutes); 

// Stripe Payment Intent
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("Restaurant Reservation App Backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
>>>>>>> Test01
