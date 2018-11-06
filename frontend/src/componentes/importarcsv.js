import React, { Component } from 'react';

import {
    Form, Button, Input
} from 'reactstrap';


import axios, { post } from 'axios';

class ImportarCSV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caminho : "",
            variavel : ""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e, url) {
        e.preventDefault();

        if(this.state.variavel == 0){
            url = "http://localhost:3001/api/reserves/from-csv"
        }
        else{
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
                alert("A operação falhou.");
            }
        }).catch(error => {
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })

    }
    render() {
        return (
            <div>


                Importar CSV das horarios
                <Form onSubmit={this.onSubmit}>
                    <Input caminho="caminho" placeholder="escreva o caminho para o arquivo "
                        onChange={(e) => this.setState({ caminho: e.target.value, variavel : 0 })}
                    />
                    <Button type="submit">Enviar</Button>
                </Form>
                <br />
                <br />
                Importar CSV das salas
                <Form onSubmit={this.onSubmit} >
                    <Input caminho="caminho" placeholder="escreva o caminho para o arquivo "
                        onChange={(e) => this.setState({ caminho: e.target.value, variavel : 1 })}
                    />
                    <Button type="submit">Enviar</Button>
                </Form>
            </div>
        )
    }
}

export default ImportarCSV;