export {};
const Router = require('express');
const UserController = require('../controllers/user_controller');
const AuthMiddleware = require('../middleware/auth_middleware');

const router = new Router();

router.get('/auth', AuthMiddleware, UserController.check_auth);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.delete('/:id', UserController.delete);

module.exports = router;