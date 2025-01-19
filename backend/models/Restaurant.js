const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  hours: { type: String, required: true },
  pictures: [String],
  reservationTypes: [String],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
