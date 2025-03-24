const express = require('express')
const router = express.Router()
const clientControllers = require('../controllers/clientsController')

router.get('/clientControllers/' , clientControllers.getAllClients)

module.exports = router