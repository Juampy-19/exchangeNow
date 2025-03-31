const express = require('express');
const { fiatPrice } = require('../controllers/fiatController.js');

const router =  express.Router();

router.get('/fiat', fiatPrice);

module.exports = router;