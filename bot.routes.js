const express = require('express');
const { createBot, list, detail } = require('../controllers/bot.controller');
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();

router.use(authenticate);

router.post('/', createBot);
router.get('/', list);
router.get('/:id', detail);

module.exports = router;
