import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, } from 'reactstrap';
import {isAuthenticated} from '../authToken.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSignOutAlt)



class MainNavbar extends Component {
    render() {
        if(isAuthenticated()){
        return (
            <div className="App">
                <Navbar color="secondary">

                    <Nav className="mr-auto">
                        <NavbarBrand href="" className="text-light"><b>UTFPR Reservas</b></NavbarBrand>
                    </Nav>

                    <Nav className="mr-auto">
                        <NavItem className="center">
                            <NavLink href="" className="text-light"><b>Reservas</b></NavLink>
                        </NavItem>
                    </Nav>
                    
                    
                    <Nav className="mr-auto">
                        <NavItem className="center">
                            <NavLink href="" className="text-light"><b>Calendario</b></NavLink>
                        </NavItem>
                    </Nav>
                    
                    <Nav className="mr-auto">
                        <NavItem className="center">
                            <NavLink href="" className="text-light"><b>Recursos e equipamentos</b></NavLink>
                        </NavItem>
                    </Nav>

                    <Nav className="mr-auto">
                        <NavItem className="center">
                            <NavLink href="" className="text-light"><b>Teste</b></NavLink>
                        </NavItem>
                    </Nav>

                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink href="" className="text-light"><FontAwesomeIcon icon="sign-out-alt" /> <b>Logout</b></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                

            </div>
        );
        }
        else
            return (
            <div className="App">
                <Navbar color="secondary">

                    <Nav className="mr-auto">
                        <NavbarBrand href="" className="text-light"><b>UTFPR Reservas</b></NavbarBrand>
                    </Nav>
            

                    <Nav className="mr-auto">
                        <NavItem className="center">
                            <NavLink href="" className="text-light"><b>Calendario</b></NavLink>
                        </NavItem>
                    </Nav>



                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink href="/" className="text-light"><FontAwesomeIcon icon="sign-out-alt" /> <b>Login</b></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                

            </div>
        );
    }
}


export default MainNavbar;
