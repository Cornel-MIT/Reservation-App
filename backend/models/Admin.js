// models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'generalAdmin' }, // Role defaults to 'generalAdmin'
});

module.exports = mongoose.model('Admin', adminSchema);
