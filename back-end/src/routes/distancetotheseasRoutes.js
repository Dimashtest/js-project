const express = require('express')
const router = express.Router()
const distanceToTheSeaControllers = require('../controllers/distancetotheseasController')

router.get('/distanceToTheSeaControllers/' , distanceToTheSeaControllers.getAllDistanceToTheSea)

module.exports = router