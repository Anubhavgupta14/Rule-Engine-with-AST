const express = require('express');
const router = express.Router();
const Controller = require('../controllers/getData');

router.get('/', Controller.getData);
router.post('/edit', Controller.getSingleData);
router.patch('/delete', Controller.deleteRule);

module.exports = router;
