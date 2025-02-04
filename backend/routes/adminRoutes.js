// routes/adminRoutes.js
const express = require('express');
const Admin = require('../models/admin'); // Model, change path if necessary
const router = express.Router();

// routes/adminRoutes.js
router.get('/admins', async (req, res) => {
    console.log('Fetching admins...'); // Log to check if this route is hit.
    try {
      const admins = await Admin.find({});
      console.log('Admins found:', admins); // Log admin data for confirmation.
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error); // Detailed error log.
      res.status(500).json({ message: 'Error fetching admins', error });
    }
  });
  
module.exports = router;
