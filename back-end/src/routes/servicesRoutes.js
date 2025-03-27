const express = require('express')
const router = express.Router()
const serviceControllers = require('../controllers/servicesController')

router.get('/serviceControllers/' , serviceControllers.getAllNumberOfRoom)

module.exports = router