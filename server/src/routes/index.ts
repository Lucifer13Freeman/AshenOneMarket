export {};
const Router = require('express');
const router = new Router();

const user_router = require('./user_router');
const device_router = require('./device_router');
const brand_router = require('./brand_router');
const type_router = require('./type_router');

router.use('/user', user_router);
router.use('/device', device_router);
router.use('/brand', brand_router);
router.use('/type', type_router);

module.exports = router;