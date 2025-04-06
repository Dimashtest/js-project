const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/propertiesController')

router.post('/', propertyController.createProperty)
router.get('/', propertyController.getAllProperties)
router.get('/property-counts', propertyController.getPropertyCounts);
router.get('/by-id', propertyController.getPropertyByQueryId);

module.exports = router