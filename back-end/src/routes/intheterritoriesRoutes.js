const express = require('express')
const router = express.Router()
const inTheTerritoryControllers = require('../controllers/intheterritoriesController')

router.get('/inTheTerritoryControllers/' , inTheTerritoryControllers.getAllInTheTerritories)

module.exports = router