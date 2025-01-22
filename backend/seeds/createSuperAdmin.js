const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    const superAdminExists = await User.findOne({ role: 'superadmin' });

    if (superAdminExists) {
      console.log('Super Admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash('superadminpassword', 10);
    const superAdmin = new User({
      username: 'superadmin',
      password: hashedPassword,
      role: 'superadmin',
    });

    await superAdmin.save();
    console.log('Super Admin created!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
  });
