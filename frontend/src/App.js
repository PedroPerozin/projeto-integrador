import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from './pages/login.js'
import Cadastro from './pages/cadastro.js'
import MainNavbar from './componentes/MainNavbar.js'
import './App.css';

class App extends Component {

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/cadastro" exact={true} component={Cadastro} />
                    <Route path="/MainNavbar" exact={true} component={MainNavbar} />
                </Switch> 
            </BrowserRouter>
        );
    }

}

export default App;
