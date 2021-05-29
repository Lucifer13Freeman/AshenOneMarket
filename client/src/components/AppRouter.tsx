import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '..';
import { auth_routes, public_routes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => 
{
    const { user } = useContext(Context);
    
    return (
        
        <Switch>
            { user.is_auth && auth_routes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            ) }
            { public_routes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            ) }
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
}

export default AppRouter;