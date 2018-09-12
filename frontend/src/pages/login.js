import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './login.css';

class Login extends Component {

	render() {
		return ( 
			<div>
			    <Container>
			        <Row>
			          <Col sm="12" md={{ size: 4, offset: 4 }}>
				          	<div className="text-center body">
						        <Form className="form-signin form">
						            <h1 className="h3 mb-3 font-weight-normal">Bem-vindo!</h1>
						            
						            <Input 
						                type="email"
						                name="email"
						                required
						                placeholder="Digite seu e-mail" />

						            <Input type="password"
						                name="password"
						                required
						                placeholder="Digite sua senha" />

						            <Button className="btn btn-info btn-color margin-button" type="submit" color="primary">Entrar!</Button><br/>
									<p>Ainda não é cadastrado? <Link to="/cadastro">Cadastre-se!</Link><br/></p>
					

						        </Form>
					    	</div>
			          </Col>
			        </Row>
		      	</Container>
			</div>
		);
  	}
}

export default Login;
