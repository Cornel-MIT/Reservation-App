const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

// Create a new reservation
const createReservation = async (req, res) => {
  const { restaurantId, date, time } = req.body;
  const userId = req.user.id;

  try {
    const reservation = new Reservation({
      restaurant: restaurantId,
      date,
      time,
      user: userId,
    });
    await reservation.save();
    res.status(201).send(reservation);
  } catch (err) {
    res.status(400).send({ error: 'Could not create reservation.' });
  }
};

// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('restaurant').populate('user');
    res.send(reservations);
  } catch (err) {
    res.status(400).send({ error: 'Could not fetch reservations.' });
  }
};

// Get reservations for a specific restaurant
const getReservationsForRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const reservations = await Reservation.find({ restaurant: restaurantId }).populate('user');
    res.send(reservations);
  } catch (err) {
    res.status(400).send({ error: 'Could not fetch reservations for this restaurant.' });
  }
};

// Approve a reservation
const approveReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'approved' }, { new: true });
    if (!reservation) {
      return res.status(404).send({ error: 'Reservation not found.' });
    }
    res.send(reservation);
  } catch (err) {
    res.status(400).send({ error: 'Could not approve reservation.' });
  }
};

// Decline a reservation
const declineReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: 'declined' }, { new: true });
    if (!reservation) {
      return res.status(404).send({ error: 'Reservation not found.' });
    }
    res.send(reservation);
  } catch (err) {
    res.status(400).send({ error: 'Could not decline reservation.' });
  }
};

module.exports = { createReservation, getReservations, getReservationsForRestaurant, approveReservation, declineReservation };
