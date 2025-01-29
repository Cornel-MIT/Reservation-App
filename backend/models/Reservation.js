// models/Reservation.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const reservationSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  reservationDate: { type: Date, required: true },
  reservationTime: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  specialRequests: { type: String },
  confirmationNumber: { type: String, unique: true, default: uuidv4 },
  status: { type: String, default: 'pending' },
  feedback: { type: String },
  reason: { type: String },
});

module.exports = mongoose.model('Reservation', reservationSchema);
