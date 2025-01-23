// const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String },
//   phone: { type: String },
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   preferences: {
//     cuisinePreferences: [String],
//     preferredLocations: [String],
//     dietaryRestrictions: [String]
//   }
// }, { timestamps: true });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("User", userSchema);


// User.js model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
