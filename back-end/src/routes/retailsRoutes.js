const express = require('express');
const router = express.Router();
const retailController = require('../controllers/retailController')

// ▶ Аренда квартир
router.post('/create-rent-appartment', rentController.createRentAppartment)
router.get('/rentController-appartments', rentController.getAllRentAppartments)
router.delete('/delete-rent-appartment/:id', rentController.deleteRentAppartment)

// ▶ Retail
router.post('/createRetail', rentController.createRetail)
router.get('/retailController', rentController.getAllRetail)

// ▶ Бронирования
router.post('/createBooking', rentController.createBooking)
router.get('/bookingsController', rentController.getAllBookings)

module.exports = router;