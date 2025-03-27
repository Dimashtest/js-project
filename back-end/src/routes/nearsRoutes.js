const express = require('express')
const router = express.Router()
const nearControllers = require('../controllers/nearsController')

router.get('/nearControllers/' , nearControllers.getAllNear)

module.exports = router