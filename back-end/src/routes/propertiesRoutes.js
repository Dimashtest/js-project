const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/propertiesController')

router.post('/', propertyController.createProperty)
router.get('/', propertyController.getAllProperties)
router.get('/property-counts', propertyController.getPropertyCounts);

module.exports = router