const express = require('express');
const { createRestaurant, getRestaurants } = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/restaurants', authMiddleware, createRestaurant);
router.get('/restaurants', getRestaurants);

module.exports = router;