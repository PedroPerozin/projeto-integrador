import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login.js'
import Cadastro from './pages/cadastro.js'
import MainNavbar from './componentes/MainNavbar.js'
import PaginaCalendario from './pages/paginacalendario.js'
import PainelADM from './pages/paineldoadm'

import { isAuthenticated, isAdmin } from './authToken.js'

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAdmin() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/calendario', state: { from: props.location } }} />
            )
    )} />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/cadastro" exact={true} component={Cadastro} />
            <Route path="/calendario" exact={true} component={PaginaCalendario} />
            <PrivateRouteAdmin path="/paineldoadm" exact={true} component={PainelADM} />
        </Switch>
    </BrowserRouter>
);


export default Routes;