import React from 'react';
import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'


class Listagem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listaReserva: 'Carregando reservas...'
        };

        this.getDatas = this.getDatas.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        alert("cancelar: " + e.target.id); 
    }

    genDatas(d){
        var day_begin = new Date(d.day_begin);
        var day_end = new Date(d.day_end);

        var datas = [];
        var key = 0;
        while(day_begin <= day_end){
            datas.push(
                <div key={key}>
                    <Row>
                        <Col xs="2">
                            {(day_begin.getDate()+1).toString()+ '/' + (day_begin.getMonth()+1).toString() + '/' +  day_begin.getFullYear().toString()}
                        </Col>
                        <Col>
                            {d.hour[0]} - {d.hour[d.hour.length -1]}
                        </Col>
                    </Row>
                </div>
            );
            day_begin.setDate(day_begin.getDate()+7);
            key++;
        }
        return datas;
    }

    getDatas(date){
        var datas = []
        if(date){
            return date.map( d => (
                <div key={d._id}>
                    <Row>
                        <Col>
                            {this.genDatas(d)}
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </div>
            )
            )
        }
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

                for(var i = 0;i < json.data.reserves.length;i++){
                    a.push(json.data.reserves.pop());
                }

                listReserve = a.map( r => (
                    <ListGroupItem key={r._id}>
                        <Row>
                            <Col xs = "auto">
                                Sala: {r.room.cod}<br/>
                            </Col>
                            <Col>
                                Status: {r.status}
                            </Col>
                            <Button id={r._id} onClick={this.handleClick} disabled={r.status === 'cancelada'} color="danger">Cancelar</Button>
                        </Row>
                        <Row>
                            <Col xs="2">
                                Data(s):
                            </Col>
                            <Col>
                                Horário:
                            </Col>
                        </Row>
                        {this.getDatas(r.date)}
                        <br/><p>Justificativa:<br/>{r.justification}</p>
                    </ListGroupItem>
                ));

                this.setState({listaReserva:listReserve});

            }
            else {
                this.setState({listaReserva:'Não foi possível obter suas reservas'});
            }
        }).catch( error => {
            this.setState({listaReserva:'Falha na conexão com o servidor.'});
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        });
    }

    render() {
        return(
            <div>
                <MainNavbar/>
                <br/>
                <Container>
                    <h1>Minhas Reservas</h1>
                    <ListGroup>

                        {this.state.listaReserva}

                    </ListGroup>
                </Container>
            </div>
        );
    }
}

export default Listagem;
