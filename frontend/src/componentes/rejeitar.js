import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from "axios";


export default class Singup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            admjustificativa: '',   
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        this.setState({admjustificativa: event.target.value});

      }
    handleClick(e){
        this.props.rejeitar(e, this.state.admjustificativa)
        console.log(this.state.admjustificativa);
        this.setState({admjustificativa: ''})
    }
    

    render() {
        return (

            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Diga a justificativa para a rejeição</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleText">Justificativa</Label>
                            <Input type="textarea"
                                name="admjustificativa"
                                id="exampleText"
                                onChange = {this.handleChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" value = '' onClick={this.handleClick}>Enviar</Button>
                    <Button color="danger" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}