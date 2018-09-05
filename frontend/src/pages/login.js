import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './login.css';

class Login extends Component {

	render() {
		return ( 
			<div>
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
			                placeholder="Digite sua senha" /><br/>

			            <Button className="btn btn-info btn-color margin-button" type="submit" color="primary">Entrar!</Button><br/>
						Ainda não é cadastrado? <Link to="/cadastro">Cadastre-se!</Link>

			        </Form>
			    </div>
			</div>
	);
  	}
}

export default Login;