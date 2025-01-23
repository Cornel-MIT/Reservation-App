const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/Users'); // Adjust the path based on your project structure
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createSuperAdmin = async () => {
  const username = 'Super@Admin.com';
  const password = 'SuperAdmin123';
  const role = 'super_admin';

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const superAdmin = new User({ username, password: hashedPassword, role });
    await superAdmin.save();
    console.log('Super admin created successfully');
  } catch (err) {
    console.error('Failed to create super admin', err);
  } finally {
    mongoose.connection.close();
  }
};

createSuperAdmin();
