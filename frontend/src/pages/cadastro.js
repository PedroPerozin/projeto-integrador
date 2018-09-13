import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Cadastro extends Component {

	constructor(props) {
		super(props);

		this.state = {
            nome: '',
			email: '',
			senha: '',
            confirmasenha:''
		};

        this.handleSubmit = this.handleSubmit.bind(this)
	}

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        if(this.state.nome === '' || this.state.email === '' || this.state.senha === ''){
            alert("Preencha todos os campos");
        }
        else if(this.state.senha !== this.state.confirmasenha){
            alert("As senhas não coincidem. Tente Novamente");
        }
        else{
        }
    }

	render() {
		return(
			<div>
				<Container>
					<h2>Cadastro</h2>
					<Form className="form" onSubmit={this.handleSubmit}>
						<Col>
                            <FormGroup>
								<Label> Nome </Label>
								<Input
									name="nome"
                                    onChange={(e) => this.setState({nome: e.target.value})}
                                />
							</FormGroup>
                        </Col>
                        <Col>
							<FormGroup>
								<Label> Email </Label>
								<Input
									type="email"
									name="email"
									placeholder="email@email.com"
                                    onChange={(e) => this.setState({email: e.target.value})}
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label> Senha </Label>
								<Input
									type="password"
									name="senha"
                                    onChange={(e) => this.setState({senha: e.target.value})}
								/>
							</FormGroup>
						</Col>
                        <Col>
							<FormGroup>
								<Label> Confirmar Senha</Label>
								<Input 
									type="password"
									name="confirmasenha"
                                    onChange={(e) => this.setState({confirmasenha: e.target.value})}
								/>
							</FormGroup>
						</Col>
					<Button>Cadastrar</Button>
					</Form>
				</Container>
			</div>
		);
	}

}

export default Cadastro;
