const express = require('express');
const { createRestaurant, getRestaurants } = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRestaurant);
router.get('/', getRestaurants);

module.exports = router;