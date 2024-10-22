const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ruleParser');

router.post('/', Controller.createRule);

module.exports = router;
