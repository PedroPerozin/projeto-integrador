import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Routes from './routes.js'
import './App.css';

class App extends Component {

    render() {
        return(
            <Routes/>
        );
    }

}

export default App;
