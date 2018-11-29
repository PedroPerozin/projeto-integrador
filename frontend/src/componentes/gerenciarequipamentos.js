import React, { Component } from 'react';
import { Container, Row } from 'reactstrap'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class GerenciamentoEquipamentos extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Form>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input type="text" name="name" id="name" placeholder="Nome do Equipamento" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Quantidade</Label>
                                <Input type="text" name="name" id="name" placeholder="Nome do Equipamento" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Descrição</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                            </FormGroup>
                        </Form>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GerenciamentoEquipamentos;