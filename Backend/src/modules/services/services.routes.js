const express = require('express');
const router = express.Router();
const serviceController = require('./services.controller');
const { authenticate } = require('../../middleware/auth.middleware');

router.use(authenticate);

router.get('/', serviceController.getAllServices);
router.get('/bookings', serviceController.getAllBookings);
router.patch('/bookings/:id/status', serviceController.updateBookingStatus);
router.post('/bookings', serviceController.createBooking);

module.exports = router;
