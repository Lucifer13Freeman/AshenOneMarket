export {};
const Router = require('express');
const BrandController = require('../controllers/brand_controller');
const CheckRole = require('../middleware/check_role_middleware');

const router = new Router();

router.get('/', BrandController.get_all);
router.post('/', CheckRole('ADMIN'), BrandController.create);
router.delete('/:id', CheckRole('ADMIN'), BrandController.delete);

module.exports = router;