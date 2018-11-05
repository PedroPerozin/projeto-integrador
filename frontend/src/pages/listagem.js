import React from 'react';
import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'


class Listagem extends Component {

    render() {
        return(
            <div>
            	<MainNavbar/>
            	<br/>

            	<Container>
            		<ListGroup>
				    	<ListGroupItem>Cras justo odio</ListGroupItem>
				    	<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
				    	<ListGroupItem>Morbi leo risus</ListGroupItem>
				    	<ListGroupItem>Porta ac consectetur ac</ListGroupItem>
				    	<ListGroupItem>Vestibulum at eros</ListGroupItem>
			     	</ListGroup>
            	</Container>
            	
            </div>
        );
    }
}

export default Listagem;
