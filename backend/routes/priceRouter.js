const express = require('express');
const { getPrice } = require('../controllers/priceController.js');

const router = express.Router();

router.get('/price', getPrice);

module.exports = router;