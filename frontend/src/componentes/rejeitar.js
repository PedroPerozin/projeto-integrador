import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from "axios";

export default class Singup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            admjustificativa: '',   
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value })

    }

   

     handleClick() {
       
        console.log(this.props.id)
        
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
                                onChange={(event) => this.handleChange(event)}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.handleClick}>Enviar</Button>
                    <Button color="danger" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}