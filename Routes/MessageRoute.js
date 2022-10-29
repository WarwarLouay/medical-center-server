const router = require('express').Router();
const MessageController = require('../Controllers/MessageController');

router.post('/sendMessage', MessageController.sendMessage);
router.post('/messages/list', MessageController.listmessages);

module.exports = router;