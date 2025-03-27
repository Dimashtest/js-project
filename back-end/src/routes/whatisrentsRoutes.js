const express = require('express')
const router = express.Router()
const whatisrentControllers = require('../controllers/whatisrentsController')

router.get('/whatisrentControllers/' , whatisrentControllers.getAllRents)

module.exports = router