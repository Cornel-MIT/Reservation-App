// routes/reservationRoutes.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Reservation = require('../models/Reservation');

const router = express.Router();

// Create a new reservation
router.post('/create', async (req, res) => {
  const {
    guestName, phone, email, reservationDate, reservationTime, numberOfGuests, specialRequests,
  } = req.body;

  const confirmationNumber = uuidv4();

  const newReservation = new Reservation({
    guestName,
    phone,
    email,
    reservationDate,
    reservationTime,
    numberOfGuests,
    specialRequests,
    confirmationNumber,
  });

  try {
    const savedReservation = await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully', confirmationNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
});

// Fetch all reservations
router.get('/all', async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
});

// Approve a reservation
router.post('/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(id, { status: 'approved', feedback }, { new: true });
    res.status(200).json({ message: 'Reservation approved successfully', reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ message: 'Error approving reservation', error });
  }
});

// Decline a reservation
router.post('/decline/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(id, { status: 'declined', reason }, { new: true });
    res.status(200).json({ message: 'Reservation declined successfully', reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ message: 'Error declining reservation', error });
  }
});

module.exports = router;
