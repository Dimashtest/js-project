const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/propertiesController')

router.post('/createProperty', propertyController.createProperty)
router.get('/propertyController', propertyController.getAllProperties)

module.exports = router