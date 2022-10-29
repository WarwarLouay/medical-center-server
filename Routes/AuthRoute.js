const router = require('express').Router();
const UserController = require('../Controllers/UserController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');

router.post('/verify', AuthMiddleware.checkUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getAllPatients', UserController.getAllPatients);

module.exports = router;