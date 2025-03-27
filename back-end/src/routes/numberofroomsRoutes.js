const express = require('express')
const router = express.Router()
const numberOfRoomControllers = require('../controllers/numberofroomsController')

router.get('/numberOfRoomControllers/' , numberOfRoomControllers.getAllNumberOfRoom)

module.exports = router