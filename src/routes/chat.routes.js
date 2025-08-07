const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller.js');
const { authenticate } = require('../middleware/auth.middleware.js');

router.use(authenticate);
router.post('/send', chatController.sendMessage);
router.get('/:roomId', chatController.getMessages);

module.exports = router;
