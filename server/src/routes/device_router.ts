export {};
const Router = require('express');
const DeviceController = require('../controllers/device_controller');
const CheckRole = require('../middleware/check_role_middleware');

const router = new Router();

router.get('/', DeviceController.get_all);
router.get('/:id', DeviceController.get);
router.post('/', CheckRole('ADMIN'), DeviceController.create);
router.delete('/:id', CheckRole('ADMIN'), DeviceController.delete);

module.exports = router;