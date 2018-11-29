import React from 'react';
import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'
import ItemReserva from '../componentes/itemlistareserva.js'


class Listagem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listaReserva:[] 
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if (window.confirm("Você tem certeza?")){
            var i;
            var r = Object.assign([],this.state.listaReserva);
            for(i = 0;i < r.length;i++)
                if(r[i]._id === e.target.id)
                    break;

            r[i].status = 'cancelada';
            this.setState({listaReserva:r});
        }
        else{
            return;
        }
        
        fetch("http://localhost:3001/api/reserves/cancel/" + e.target.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                alert("Reserva cancelada com sucesso")
            }
            else {
                alert("Reserva não encontrada");
            }
        }).catch(error => {
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        }); 
    }

    componentWillMount(){
        this.setState({statusMessage: <Alert color='warning'> Obtendo reservas... </Alert>});
        fetch("http://localhost:3001/api/reserves/from-user/?status=all", {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "x-access-token": localStorage.getItem('token')
            },
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                var listReserve = [];
                var a = [];

                var size = json.data.reserves.length;
                for(var i = 0;i < size;i++){
                    a.push(json.data.reserves.pop());
                }

                if(a.length != 0){
                    this.setState({listaReserva:a, statusMessage:''});
                }
                else {
                    this.setState({ statusMessage: <Alert color='success'> Nenhuma reserva encontrada </Alert>});
                }

            }
            else {
                //
            }
        }).catch( error => {
            this.setState({statusMessage: <Alert color="danger"> Não foi possível conectar com o servidor </Alert>});
        });
    }

    render() {
        return(
            <div>
                <MainNavbar/>
                <br/>
                <Container>
                    <h1>Minhas Reservas</h1>
                    {this.state.statusMessage}
                    <ListGroup>
                        {

                            this.state.listaReserva.map( r => {
                                return(
                                    <ItemReserva key={r._id} reserva={Object.assign({},r)} handleClick={this.handleClick} tipo='user'/>
                                )
                            })

                        }

                    </ListGroup>
                </Container>
            </div>
        );
    }
}

export default Listagem;
