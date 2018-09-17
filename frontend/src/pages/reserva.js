import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './login.css';

class Reserva extends Component {

	render() {
    return (
      	<div className="margin-top">
		    <Container>
		        <Row>
		        	<Col>
		          		<h1>Reservas</h1>
			        	<ListGroup>
					    	<ListGroupItem>
					    		<Container>
					    			<Row>
					    				<Col xs="3" className="margin-top">
					    					<h4>F101</h4>
					    				</Col>

								        <Col xs="6">
								        	<p>Equipamentos: Projetor</p>
								        	<p>Data: 17/09/2018</p>
								        	<p>Hora: 15h30</p>
								        	<p><Alert color="success">Status: Aceito!</Alert></p>
								        </Col>

								        <Col xs="3" className="margin-top">
								        	<Button color="danger">Cancelar</Button>{' '}

								        </Col>
					    			</Row>

					    		</Container>
					    	</ListGroupItem>
						</ListGroup>
		        	</Col>
		        </Row>
	      	</Container>
		</div>
    );
  }
}
export default Reserva;
