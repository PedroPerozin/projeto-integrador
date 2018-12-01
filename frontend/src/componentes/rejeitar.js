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
    }

    handleChange(event) {
        this.setState({admjustificativa: event.target.value});

      }

    

    render() {
        return (

            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
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
                    <Button color="success" value = {this.state.admjustificativa} onClick={this.props.rejeitar}>Enviar</Button>
                    <Button color="danger" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}