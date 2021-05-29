import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import { Container, Button, Form, Card, Row } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => 
{
    const { user } = useContext(Context);

    const location = useLocation();
    const history = useHistory();
    const is_login = location.pathname === LOGIN_ROUTE;

    const [ email, set_email ] = useState('');
    const [ password, set_password ] = useState('');

    const auth = async () => 
    {
        try
        {
            let data;
    
            if (is_login) data = await login(email, password);
            else data = await registration(email, password);
    
            user.set_user(user);
            user.set_is_auth(true);

            history.push(SHOP_ROUTE);
        }
        catch(e)
        {
            alert(e.response.data.message);
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">
                    { is_login ? 'Авторизация' : 'Регистрация' }
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => set_email(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={e => set_password(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        { is_login ? 
                            <div>
                                Нет аккаунта? 
                                <NavLink to={REGISTRATION_ROUTE} className="ml-3">
                                    Перейти к регистрации
                                </NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? 
                                <NavLink to={LOGIN_ROUTE} className="ml-3">
                                    Войти
                                </NavLink>
                            </div>
                        }
                        <Button 
                            variant={"outline-dark"}
                            onClick={auth}
                        >
                            { is_login ? 'Войти' : 'Регистрация' }
                        </Button>
                    </Row> 
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;