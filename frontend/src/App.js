import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from './pages/login.js'
import Cadastro from './pages/cadastro.js'
<<<<<<< HEAD
import MainNavbar from './pages/MainNavbar.js'
=======
import Principal from './pages/principal.js'
>>>>>>> 4abc3a61f7d34998b569fb22667304c61e61ca7a
import './App.css';

class App extends Component {

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/cadastro" exact={true} component={Cadastro} />
<<<<<<< HEAD
                    <Route path="/MainNavbar" exact={true} component={MainNavbar} />
=======
                    <Route path="/principal" exact={true} component={Principal} />
>>>>>>> 4abc3a61f7d34998b569fb22667304c61e61ca7a
                </Switch> 
            </BrowserRouter>
        );
    }

}

export default App;
