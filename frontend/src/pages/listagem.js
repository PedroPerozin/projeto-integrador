import React from 'react';
import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'


class Listagem extends Component {

	constructor(props) {
        super(props);

        this.state = {
            listaReserva: ''
        };
    }


	componentWillMount(){
		fetch("http://localhost:3001/api/reserves/from-user/?status=all", {
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    "x-access-token": localStorage.getItem('token')
                },
            }).then((response) => response.json()).then((json) => {
                if (json.success) {
                	var listReserve = [];

                	for(var i=0; i<json.data.reserves.length;i++){
                		listReserve.push(
                			<ListGroupItem>
					    		<Row>
					    			<Col>
							    		Sala: {json.data.reserves[i].room.cod}<br/>
							    		<p>Status: {json.data.reserves[i].status}</p>
						    		</Col>
						    		<Col sm="12" md={{ size: 3, offset: 6 }}>
						    			<Button color="success">Aceitar</Button>{' '}
					    				<Button color="danger">Rejeitar</Button>{' '}
						    		</Col>
					    		</Row>
					    		<Row>
					    			<Col xs="auto">
					    				Data: 05/11/2019<br/>
					    			</Col>
					    			<Col xs="auto">
					    				Horário: N1-N3<br/>
					    			</Col>
					    		</Row>
					    		<br/><p>Justificativa<br/>{json.data.reserves[i].justification}</p>
					    	</ListGroupItem>
                		)
                	}

                	this.setState({listaReserva:listReserve});

                }
                else {
                }
            }).catch( error => {
                alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
            });
	}

    render() {
        return(
            <div>
            	<MainNavbar/>
            	<br/>

            	<Container>
            		<ListGroup>

				    	{this.state.listaReserva}
				    	
			     	</ListGroup>
            	</Container>
            </div>
        );
    }
}

export default Listagem;
