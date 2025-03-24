const express = require('express')
const router = express.Router()
const rentControllers = require('../controllers/rentAppartmentsController')

router.get('/rentControllers/' , rentControllers.getAllRentals)

module.exports = router