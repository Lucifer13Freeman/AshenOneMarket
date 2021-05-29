export {};
const Router = require('express');
const TypeController = require('../controllers/type_controller');
const CheckRole = require('../middleware/check_role_middleware');

const router = new Router();

router.get('/', TypeController.get_all);
router.post('/', CheckRole('ADMIN'),  TypeController.create);
router.delete('/:id', CheckRole('ADMIN'), TypeController.delete);

module.exports = router;