const express = require('express')
const router = express.Router()
const rentControllers = require('../controllers/bookingsController')

router.get('/rentControllers/' , rentControllers.getAllRetail)
router.get('/getAllBookingControllers/' , rentControllers.getAllBookings)
router.get('/createBookingControllers/' , rentControllers.createBooking)

module.exports = router