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
            listaReserva:[{
                _id:'',
                room:{cod:''},
                status:'',
                date:[],
                justification:'',
            }] 
        };

        this.getDatas = this.getDatas.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
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
        if (window.confirm("Você tem certeza?")){
            console.log("confirmado");
        }
        else{
            console.log("Não confirmado");
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

    genDatas(d){
        var day_begin = new Date(d.day_begin);
        var day_end = new Date(d.day_end);
        //console.log(day_begin);
        //console.log(day_begin.getUTCDate());
        //day_begin.setDate(day_begin.getDate()+1);
        //day_end.setDate(day_begin.getDate()+1);

        var datas = [];
        var key = 0;
        while(day_begin <= day_end){
            datas.push(
                <div key={key}>
                    <Row>
                        <Col xs="2">
                            {('0' + (day_begin.getUTCDate())).slice(-2) + '/' + ('0' + (day_begin.getUTCMonth()+1)).slice(-2) + '/' + day_begin.getFullYear()}
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
        //console.log(date);
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

                var size = json.data.reserves.length;
                for(var i = 0;i < size;i++){
                    a.push(json.data.reserves.pop());
                }

                //listReserve = a.map( r => (
                    //<ListGroupItem key={r._id}>
                        //<Row>
                            //<Col xs = "auto">
                                //Sala: {r.room.cod}<br/>
                            //</Col>
                            //<Col>
                                //Status: {r.status}
                            //</Col>
                            //<Button id={r._id} onClick={this.handleClick} disabled={r.status === 'cancelada'} color="danger">Cancelar</Button>
                        //</Row>
                        //<Row>
                            //<Col xs="2">
                                //Data(s):
                            //</Col>
                            //<Col>
                                //Horário:
                            //</Col>
                        //</Row>
                        //{this.getDatas(r.date)}
                        //<br/><p>Justificativa:<br/>{r.justification}</p>
                    //</ListGroupItem>
                //));

                console.log(a);
                this.setState({listaReserva:a});

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
