const express = require('express');
const { createReservation, getReservations, getReservationsForRestaurant, approveReservation, declineReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createReservation);
router.get('/', authMiddleware, getReservations);
router.get('/restaurant/:restaurantId', authMiddleware, getReservationsForRestaurant);
router.patch('/approve/:reservationId', authMiddleware, approveReservation);
router.patch('/decline/:reservationId', authMiddleware, declineReservation);

module.exports = router;
