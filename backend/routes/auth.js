const express = require('express');
const { registerUser, loginUser, assignAdmin, updateUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send({ error: 'Access denied.' });
  }
  next();
};

const router = express.Router();

router.use((req, res, next) => {
  console.log('Auth router middleware accessed');
  next();
});

router.post('/register', (req, res, next) => {
  console.log('Register route accessed');
  next();
}, registerUser);

router.post('/login', (req, res, next) => {
  console.log('Login route accessed');
  next();
}, loginUser);

router.post('/assign-admin', authMiddleware, roleMiddleware(['super_admin']), assignAdmin);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
