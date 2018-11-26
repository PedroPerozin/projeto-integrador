import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class ItemReserva extends Component{

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.reserva.status === this.props.reserva.status){
            return false;
        }
        else{
            return true;
        }
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
    render(){
        console.log(this.props);
        if(this.props.reserva){
            if (this.props.tipo == 'user'){
                return(
                    <ListGroupItem>
                        <Row>
                            <Col xs = "auto">
                                Sala: {this.props.reserva.room.cod}<br/>
                            </Col>
                            <Col>
                                Status: {this.props.reserva.status}
                            </Col>
                            <Button id={this.props.reserva._id} onClick={this.props.handleClick} disabled={this.props.reserva.status === 'cancelada'} color="danger">Cancelar</Button>
                        </Row>
                        <Row>
                            <Col xs="2">
                                Data(s):
                            </Col>
                            <Col>
                                Horário:
                            </Col>
                        </Row>
                        {this.getDatas(this.props.reserva.date)}
                        <br/><p>Justificativa:<br/>{this.props.reserva.justification}</p>
                    </ListGroupItem>
                )
            }
            else if(this.props.tipo == 'adm'){
                return(
                    <ListGroupItem key={this.props.reserva._id}>
                        <Row>
                            <Col xs="auto">
                                Sala: {this.props.reserva.room.cod}
                                <br />
                            </Col>
                            <Col>
                                Solicitante: {this.props.reserva.user.name ? this.props.reserva.user.name : this.props.reserva.user.email}
                            </Col>
                            <Button
                                id={this.props.reserva._id}
                                value={"aceita"}
                                onClick={this.props.handleClick}
                                color="success"
                            >
                                Aceitar
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                id={this.props.reserva._id}
                                value={"rejeitada"}
                                onClick={this.props.handleClick}
                                color="danger"
                            >
                                Rejeitar
                            </Button>
                        </Row>
                        <Row>
                            <Col xs="2">Data(s):</Col>
                            <Col>Horário:</Col>
                        </Row>
                        {this.getDatas(this.props.reserva.date)}
                        <br />
                        <p>
                            Justificativa:
                            <br />
                            {this.props.reserva.justification}
                        </p>
                    </ListGroupItem>
                )
            }
        }
        return(<div></div>)
    }
}
