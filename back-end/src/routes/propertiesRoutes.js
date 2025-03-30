const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/propertiesController')

router.post('/', propertyController.createProperty)
router.get('/', propertyController.getAllProperties)

module.exports = router