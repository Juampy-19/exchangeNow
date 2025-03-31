const express = require('express');
const { cryptoPrice } = require('../controllers/cryptoController.js');

const router = express.Router();

router.get('/crypto', cryptoPrice);

module.exports = router;