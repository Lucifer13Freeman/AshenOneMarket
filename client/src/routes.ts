import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Device from './pages/Device';
import Shop from './pages/Shop';
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts';

export const auth_routes = [

    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
];

export const public_routes = [

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: Device
    }
];