const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ruleParser');

router.post('/', Controller.createRule);
router.post('/edit', Controller.editRule);

module.exports = router;
