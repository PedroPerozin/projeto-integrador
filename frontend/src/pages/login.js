import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './login.css';
import axios from 'axios';




export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3001/api/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password

            })
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                console.log(json.data.token)
                localStorage.setItem("token", json.data.token);
                axios.defaults.headers = {
                    "Authorization": localStorage.getItem("token")
                }
                this.props.history.push("/calendario");
            }
            else {
                alert("Usuário ou senha incorreto");
            }
        }).catch(error => {
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        });


    }





    render() {
        return (
            
            <div className="body">
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 4, offset: 4 }}>
                            <div className="text-center body1">
                                <Form className="form-signin form">
                                    <h1 className="logo"></h1>
                                    <h1 className="title">Bem-vindo!</h1>

                                    <Input
                                        type="email"
                                        name="email"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        required
                                        placeholder="Digite seu e-mail" />

                                    <Input type="password"
                                        name="password"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        required
                                        placeholder="Digite sua senha" />

                                    <Button className="btn btn-color margin-button" type="submit" color="primary" onClick={this.handleSubmit}>Entrar</Button><br />
                                    <p className="info">Ainda não é cadastrado? <Link to="/cadastro">Cadastre-se!</Link><br /></p>
                                    


                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

