const express = require('express')
const router = express.Router()
const locationController = require('../controllers/locationsController')

router.post('/createLocation', locationController.createLocation)
router.get('/locationController', locationController.getAllLocations)

module.exports = router