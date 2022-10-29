const router = require('express').Router();
const RoomController = require('../Controllers/RoomController');

router.post('/joinRoom', RoomController.joinRoom);

module.exports = router;