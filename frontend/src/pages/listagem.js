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

				    	<ListGroupItem>
				    		<h4>Allison Sampaio</h4>
				    		<Row>
				    			<Col>
				    				<p>Data: 05/11/2019</p>
				    			</Col>
				    			<Col>
				    				<p>Horário: N1-N3</p>
				    			</Col>
				    		</Row>
				    		<p>Justificativa: Aula de Redes 2</p>
				    		<Button color="success">Aceitar</Button>{' '}
				    		<Button color="danger">Rejeitar</Button>{' '}
				    	</ListGroupItem>
				    	
			     	</ListGroup>
            	</Container>
            </div>
        );
    }
}

export default Listagem;
