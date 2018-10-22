import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login.js'
import Cadastro from './pages/cadastro.js'
import MainNavbar from './componentes/MainNavbar.js'
import PaginaCalendario from './pages/paginacalendario.js'
import { isAuthenticated } from './authToken.js'
import LoginSA from './pages/loginsistemaacademico.js';
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/cadastro" exact={true} component={Cadastro} />
            <Route path="/calendario" exact={true} component={PaginaCalendario} />
            <Route path="/loginsistemaacademico" exact={true} component={LoginSA} />
        </Switch>
    </BrowserRouter>
);


export default Routes;