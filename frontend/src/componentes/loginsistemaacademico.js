import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';


export default class LoginSA extends Component {

    constructor(props){
        super(props);

        this.state = {
            "email": "",
            "password": ""
        }

        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault()
        var adm = {
            "email": this.state.email,
            "password": this.state.password
        }
        // console.log(this.state.email)
        // console.log(this.state.password)
        console.log(adm)
    }

    
    // teste(e){
    //     this.setState({email: e.target.value})
            
    //     //console.log(this.state.email);

    // }


    render() {


        return (
            <div>
                <Container>
                    <h2>Login Sistema Acadêmico</h2>

                    <Form className="form" onSubmit={this.submit}>
                        <FormGroup>
                            <Label for="Email"><h3><b>Email</b></h3></Label>
                            <Input type="email" name="email" id="Email" placeholder="email@email.com" onChange ={(e) => {this.setState({email: e.target.value})}}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="Senha"><h3><b>Senha</b></h3></Label>
                            <Input type="password" name="password" id="Password" placeholder="password" onChange = {(e) => {this.setState({password: e.target.value})}}/>
                        </FormGroup>

                        <Button color="primary">Importar</Button>
                    </Form>
                </Container>

            </div>



        )
    }


}

