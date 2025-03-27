const express = require('express')
const router = express.Router()
const intheroomsController = require('../controllers/intheroomsController')

router.get('/intheroomsControllers/', intheroomsController.getAllInTheRooms)

module.exports = router