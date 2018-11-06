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
				    		<Row>
				    			<Col>
						    		Sala: F101<br/>
						    		<p>Status: Aceita</p>
					    		</Col>
					    		<Col sm="12" md={{ size: 3, offset: 6 }}>
					    			<Button color="success">Aceitar</Button>{' '}
				    				<Button color="danger">Rejeitar</Button>{' '}
					    		</Col>
				    		</Row>
				    		<Row>
				    			<Col xs="auto">
				    				Data: 05/11/2019<br/>
				    				Data: 05/11/2019<br/>
				    				Data: 05/11/2019<br/>
				    				Data: 05/11/2019<br/>
				    				Data: 05/11/2019<br/>
				    			</Col>
				    			<Col xs="auto">
				    				Horário: N1-N3<br/>
				    				Horário: N1-N3<br/>
				    				Horário: N1-N3<br/>
				    				Horário: N1-N3<br/>
				    				Horário: N1-N3<br/>
				    			</Col>
				    		</Row>
				    		<br/><p>Justificativa<br/>Aula de Redes 2</p>
				    	</ListGroupItem>
				    	
			     	</ListGroup>
            	</Container>
            </div>
        );
    }
}

export default Listagem;
