const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword,
  getUserProfile,
  updateUserProfile 
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;