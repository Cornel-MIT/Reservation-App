const mongoose = require('mongoose');

const CuisineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: { type: String, required: true },
  location: { type: String, required: true },
  pictures: [String],
  reservationTypes: [String],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

module.exports = mongoose.model('Cuisine', CuisineSchema);
