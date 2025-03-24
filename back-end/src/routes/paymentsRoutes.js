const express = require('express')
const router = express.Router()
const paymentControllers = require('../controllers/paymentsController')

router.get('/paymentControllers/' , paymentControllers.getAllPaymetns)

module.exports = router