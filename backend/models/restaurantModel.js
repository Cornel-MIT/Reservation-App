// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const restaurantSchema = new Schema({
//   name: { type: String, required: true },
//   cuisineType: { type: String, required: true },
//   location: { type: String, required: true },
//   contactDetails: { type: String, required: true },
//   operatingHours: { type: String, required: true },
//   ambianceDescription: { type: String, required: true },
//   featuredMenuItems: { type: String, required: true },
//   photos: { type: [String], required: false },
//   operatingSchedule: {
//     days: {
//       monday: { type: Boolean, default: false },
//       tuesday: { type: Boolean, default: false },
//       wednesday: { type: Boolean, default: false },
//       thursday: { type: Boolean, default: false },
//       friday: { type: Boolean, default: false },
//       saturday: { type: Boolean, default: false },
//       sunday: { type: Boolean, default: false },
//     },
//     openTime: { type: String, required: true },
//     closeTime: { type: String, required: true },
//   },
// });

// const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// module.exports = Restaurant;


const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisineType: { type: String, required: true },
  location: { type: String, required: true },
  contactDetails: { type: String, required: true },
  operatingHours: { type: String },
  ambianceDescription: { type: String },
  featuredMenuItems: { type: String },
  photos: { type: [String] },
  operatingSchedule: {
    days: {
      monday: { type: Boolean, default: false },
      tuesday: { type: Boolean, default: false },
      wednesday: { type: Boolean, default: false },
      thursday: { type: Boolean, default: false },
      friday: { type: Boolean, default: false },
      saturday: { type: Boolean, default: false },
      sunday: { type: Boolean, default: false },
    },
    openTime: { type: String },
    closeTime: { type: String },
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);