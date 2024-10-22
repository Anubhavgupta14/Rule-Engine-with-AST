const express = require('express');
const router = express.Router();
const Controller = require('../controllers/evaluateRule');

router.post('/', Controller.evaluateRule);

module.exports = router;
