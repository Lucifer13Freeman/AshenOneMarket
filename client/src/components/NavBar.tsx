import { useContext } from "react";
import { Context } from "..";
import { NavLink, useHistory } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from 'mobx-react';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';

const NavBar = observer(() => 
{
    const { user } = useContext(Context);
    const history = useHistory();

    const logout = () =>
    {
        user.set_user({});
        user.set_is_auth(false);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink
                    to={SHOP_ROUTE}
                    style={
                    {
                        color: 'white', 
                        fontSize: 28,
                        textDecoration: 'none'
                    }}
                >
                    AshenOne Market
                </NavLink>
                { user.is_auth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={ () => history.push(ADMIN_ROUTE) }
                        >
                            Админ панель
                        </Button>
                        <Button 
                            variant={"outline-light"} 
                            className="ml-2"  
                            onClick={ () => { logout(); history.push(SHOP_ROUTE) } }
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={ () => history.push(LOGIN_ROUTE) }
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;