import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login.js'
import Cadastro from './pages/cadastro.js'
import MainNavbar from './componentes/MainNavbar.js'
import PaginaCalendario from './pages/paginacalendario.js'
import Reserva from './pages/reserva.js'
import { isAuthenticated } from './authToken.js'
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
            <Route path="/reserva" exact={true} component={Reserva} />
        </Switch>
    </BrowserRouter>
);


export default Routes;