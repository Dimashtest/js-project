const express = require('express');
const router = express.Router();
const { retailController } = require('../controllers/retailController')

// ▶ Аренда квартир
router.post('/create-rent-appartment', retailController.createRentAppartment)
router.get('/rentController-appartments', retailController.getAllRentAppartments)
router.delete('/delete-rent-appartment/:id', retailController.deleteRentAppartment)

// ▶ Retail
router.post('/createRetail', retailController.createRetail)
router.get('/retailController', retailController.getAllRetail)

// ▶ Бронирования
router.post('/createBooking', retailController.createBooking)
router.get('/bookingsController', retailController.getAllBookings)


module.exports = router;