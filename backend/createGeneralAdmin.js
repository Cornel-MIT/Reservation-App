const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/Users'); // Adjust the path based on your project structure
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createGeneralAdmin = async () => {
  const username = 'Other@Admn.com';
  const email = 'Other@Admn.com';
  const password = '123456';
  const role = 'general_admin';

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('General admin already exists');
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const generalAdmin = new User({ username, email, password: hashedPassword, role });
    await generalAdmin.save();
    console.log('General admin created successfully');
  } catch (err) {
    console.error('Failed to create general admin', err);
  } finally {
    mongoose.connection.close();
  }
};

createGeneralAdmin();
