import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from './pages/login.js'
import Cadastro from './pages/cadastro.js'
import Principal from './pages/principal.js'
import './App.css';

class App extends Component {

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/cadastro" exact={true} component={Cadastro} />
                    <Route path="/principal" exact={true} component={Principal} />
                </Switch> 
            </BrowserRouter>
        );
    }

}

export default App;
