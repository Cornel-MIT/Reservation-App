// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/roleMiddleware');
const someAdminController = require('../controllers/someAdminController');

// Super Admins and Admins can access this route
router.get('/admin-data', checkRole('superadmin', 'admin'), someAdminController.getAdminData);

// Only Super Admins can access this route
router.post('/create-admin', checkRole('superadmin'), someAdminController.createAdmin);

module.exports = router;
