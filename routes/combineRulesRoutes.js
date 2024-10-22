const express = require('express');
const router = express.Router();
const Controller = require('../controllers/combineRules');

router.post('/', Controller.combineRules);

module.exports = router;
