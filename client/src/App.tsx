import { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react';
import { Context } from '.';
import { check_auth } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => 
{
  const { user } = useContext(Context);
  const [ is_loading, set_is_loading ] = useState(true);

  useEffect(() => 
  {
    check_auth()
      .then((data:any) => {

        user.set_user(true);
        user.set_is_auth(true);
      })
      .finally(() => set_is_loading(false)); 
  }, []);

  if (is_loading) return <Spinner animation={"grow"} />

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
