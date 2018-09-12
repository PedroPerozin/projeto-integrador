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
        console.log(JSON.stringify({
                    "admin":false,
                    "name":this.state.nome,
                    "email":this.state.email,
                    "password":this.state.senha

                })
        );
        if(this.state.nome === '' || this.state.email === '' || this.state.senha === ''){
            alert("Preencha todos os campos");
        }
        else if(this.state.senha !== this.state.confirmasenha){
            alert("As senhas não coincidem. Tente Novamente");
        }
        else{
            fetch("http://localhost:3000/api/users/", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "name":this.state.nome,
                    "email":this.state.email,
                    "password":this.state.senha

                })
            }).then((response) => response.json()).then((json) => {
                if (json.success) {
                    alert("Cadastro realizado com sucesso, realize o login.");
                    this.props.history.push("/");
                }
                else {
                    /* Esse caso só acontece se for feita a conexão com o bd mas não for possível inserir no usuário, provavelmente pelo email já estar cadastrado */
                    /* TO DO: melhor notificação de erro */
                    alert("Não foi possível realizar o cadastro");
                }
            }).catch( error => {
                alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
            });
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
