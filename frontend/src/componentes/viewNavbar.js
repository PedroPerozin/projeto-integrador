import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSignOutAlt)



class ViewNavbar extends Component {
    render() {
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
                            <NavLink href="" className="text-light"> <b>Login</b></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                

            </div>
        );
    }
}


export default ViewNavbar;
