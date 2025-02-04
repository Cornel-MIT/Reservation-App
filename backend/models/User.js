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

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] 
    },
    password: { type: String, required: true, select: false }, // Exclude from queries
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
    cellNo: { 
      type: String, 
      required: false, 
      match: [/^\+?\d{10,15}$/, 'Invalid phone number'] 
    },
    residentialAddress: { type: String, required: false, trim: true },
    dateOfBirth: { type: Date, required: false }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('User', userSchema);
