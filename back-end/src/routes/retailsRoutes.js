const express = require('express');
const router = express.Router();
const retailController = require('../controllers/retailController');

router.get('/', retailController.getAllRetails);
router.post('/create', retailController.createRetail);

module.exports = router;