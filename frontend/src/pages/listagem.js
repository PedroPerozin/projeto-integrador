import React from 'react';
import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
            console.log(i);

            r[i].status = 'cancelada';
            console.log(r[i]);
            this.setState({listaReserva:r});
            console.log(r);
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
        console.log(localStorage.getItem('token'));
        fetch("http://localhost:3001/api/reserves/from-user/?status=all", {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "x-access-token": localStorage.getItem('token')
            },
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                console.log("a");
                var listReserve = [];
                var a = [];

                var size = json.data.reserves.length;
                for(var i = 0;i < size;i++){
                    a.push(json.data.reserves.pop());
                }

                console.log(a);
                this.setState({listaReserva:a});

            }
            else {
            }
        }).catch( error => {
            console.log("Erro")
            console.log(error)
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        });
    }

    render() {
        console.log("aljshgaiysgb")
        console.log(this.state.listaReserva)
        return(
            <div>
                <MainNavbar/>
                <br/>
                <Container>
                    <h1>Minhas Reservas</h1>
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
