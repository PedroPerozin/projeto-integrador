import React, { Component } from 'react';

import {
    Form, Button, Input, Label, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, FormGroup
} from 'reactstrap';

import axios, { post } from 'axios';

class ImportarCSV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caminho: "",
            variavel: "",
            dropdownOpen: false,
            show: false
        }
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.showModal = this.showModal.bind(this)
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    showModal() {
        this.setState({ show: true });
    };



    onSubmit(e, url) {
        e.preventDefault();

        if (this.state.variavel == 0) {
            url = "http://localhost:3001/api/reserves/from-csv"
        }
        else {
            url = "http://localhost:3001/api/rooms/from-csv"
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "path": this.state.caminho


            })
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                alert("Operação realizada com sucesso.");
            }
            else {
                //console.log(this.state.variavel)
                //console.log(url)
                alert("A operação falhou.");
            }
        }).catch(error => {
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })

    }

    showAba(e) {
        if (e.target.value == "CSV das Salas") {
            this.state.variavel = 1;
        } else if (e.target.value == "CSV dos Horarios") {
            this.state.variavel = 0;
        }
    }

    render() {
        return (
            <div>

                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="exampleSelect">Escolha uma opção</Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => { this.showAba(e) }}>
                            <option id="horarios" >CSV dos Horarios</option>
                            <option id="salas"  >CSV das Salas</option>
                        </Input>
                    </FormGroup>
                    <Input caminho="caminho" placeholder="escreva o caminho para o arquivo " />
                    <br />
                    <Button type="submit">Enviar</Button>
                    <br />
                </Form>
            </div>
        );
    }
}
export default ImportarCSV;