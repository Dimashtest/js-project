const express = require('express');
const router = express.Router();
const intheroomController = require('../controllers/intheroomController');

router.get('/', intheroomController.getAllInTheRooms);

module.exports = router;