const express = require('express')
const router = express.Router()
const priceController = require('../controllers/pricesController')

router.get('/priceControllers/' , priceController.getAllPrice)

module.exports = router