import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import "./principal.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignOutAlt)



class Principal extends Component {
    render() {
        return (
            <div className="App">
                <Navbar color="secondary shadow-lg">

                    <Nav className="mr-auto">
                        <NavbarBrand href="" className="text-light">UTFPR Reservas</NavbarBrand>
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
}


export default Principal;
