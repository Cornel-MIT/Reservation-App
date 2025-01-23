const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'general_admin', 'super_admin'], default: 'user' },
});

// Ensure no additional `schema.index()` calls are defining duplicate indexes.

module.exports = mongoose.model('User', UserSchema);
