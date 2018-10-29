import React, { Component } from 'react';
import {
    Container, Col, Form,
     Input,
    Button, Row,
Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Calendario from '../componentes/calendario.js'
import MainNavbar from '../componentes/MainNavbar.js'
import $ from 'jquery';


var startHour = {
    'm1':  '07:30', 
    'm2':  '08:20', 
    'm3':  '09:10', 
    'm4':  '10:20', 
    'm5':  '11:10', 
    'm6':  '12:00', 
    't1':  '13:00', 
    't2':  '13:50', 
    't3':  '14:40', 
    't4':  '15:50', 
    't5':  '16:40', 
    't6':  '17:30', 
    'n1':  '18:40', 
    'n2':  '19:30', 
    'n3':  '20:20', 
    'n4':  '21:20', 
    'n5':  '22:10'
}
var endHour = {
    'm1':  '08:20', 
    'm2':  '09:10', 
    'm3':  '10:00', 
    'm4':  '11:10', 
    'm5':  '12:00', 
    'm6':  '12:50', 
    't1':  '13:50', 
    't2':  '14:40', 
    't3':  '15:30', 
    't4':  '16:40', 
    't5':  '17:30', 
    't6':  '18:20', 
    'n1':  '19:30', 
    'n2':  '20:20', 
    'n3':  '21:10', 
    'n4':  '22:10', 
    'n5':  '23:00'
}



class PaginaCalendario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sala:'',
            modal: false,
        }
        this.updateEvents = this.updateEvents.bind(this)
    }

    updateEvents(e){
        /* faz o update dos eventos */
        e.preventDefault()
        if(this.state.sala == " " || !this.state.sala){
            return;
        }
        var reservas;
        fetch("http://localhost:3001/api/reserves/roomname/" + this.state.sala.toUpperCase(), {
            method:"GET"
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                var color
                reservas = json.data.reserve;
                var reservasfinal = [];
                console.log(reservas);
                for(var i = 0;i < reservas.length;i++){
                    if (reservas[i].status === "cancelada"){
                        continue
                    }

                    for(var j = 0;j < reservas[i].date.length;j++){

                        for(var h = 0;h < reservas[i].date[j].hour.length;h++){

                            var data1 = new Date(reservas[i].date[j].day_begin.substring(0,4),parseInt(reservas[i].date[j].day_begin.substring(5,7))-1,reservas[i].date[j].day_begin.substring(8,10));
                            console.log(reservas[i].date[j].day_begin.substring(0,4),reservas[i].date[j].day_begin.substring(5,7),reservas[i].date[j].day_begin.substring(8,10));
                            console.log(data1);
                            var data2 = new Date(reservas[i].date[j].day_end.substring(0,4),parseInt(reservas[i].date[j].day_end.substring(5,7))-1,reservas[i].date[j].day_end.substring(8,10));
                            data2.setDate(data2.getDate()+1);
                            console.log(data2);


                            if (reservas[i].status == "pendente"){
                                color = '#ff9900'
                            }
                            else{
                                color = '#A87AD'
                            }
                            reservasfinal.push({
                                start:startHour[reservas[i].date[j].hour[h]],
                                end:endHour[reservas[i].date[j].hour[h]],
                                dow:[parseInt(reservas[i].date[j].day)-1],
                                title:reservas[i].date[j].hour[h],
                                ranges:[{start:data1, end:data2 }],
                                color:color
                            });

                        }
                    }
                }
                console.log(reservasfinal);
                $('#calendar').fullCalendar( 'removeEvents');
                $('#calendar').fullCalendar('addEventSource', reservasfinal);

            }
            else {
                alert(json.message);
                console.log(json);
            }
        }).catch( error => {
            alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
        });


        //this.setState({events: [
        //{
        //title: 'Aula 1',
        //start: '10:30',
        //end: '11:00',
        //dow: [2]
        //},

        //{
        //title: 'Aula 2',
        //start: '2018-09-17T10:20',
        //end: '2018-09-17T12:00'
        //},
        //{
        //title: 'Aula 3',
        //start: '2018-09-17T13:50',
        //end: '2018-09-17T15:30'
        //},
        //{
        //title: 'Aula 4',
        //start: '2018-09-17T15:50',
        //end: '2018-09-17T17:30'
        //},
        //{
        //title: 'Aula 5',
        //start: '2018-09-17T18:40',
        //end: '2018-09-17T21:10'
        //},
        //{
        //title: 'Aula 6',
        //start: '2018-09-17T21:20',
        //end: '2018-09-17T23:30'
        //}
        //] });

    } 

    render() {
        return (
            <div>
                <MainNavbar/>
                <br/>
                <Container>
                    <Row>
                        <Col xs="6">
                            <Form onSubmit={this.updateEvents}>
                                <Input 
                                    onChange={(e) => this.setState({sala: e.target.value})}
                                    placeholder="Sala (ex:e007 ou E007)"
                                    onSubmit={this.updateEvents}
                                />
                            </Form>
                        </Col>
                        <Col>
                            <Button color="primary" onClick={this.updateEvents}>OK</Button>
                        </Col>
                        <Button color="info" onClick={() => {this.setState({modal: !this.state.modal})}}>Cores</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Cor das reservas</ModalHeader>
                            <ModalBody>
                                Reservas na cor azul: Reservas confirmadas, não podem ser feitas reservas nesse horário.
                                <br/>
                                Reservas na cor laranja: Reservas que ainda dependem da decisão do administrador, podem ser feitas reservas no mesmo horário, mas o administrador terá que escolher uma.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => {this.setState({modal: !this.state.modal})}}>Ok</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </Row>
                    <Row>
                        <Col>
                            <br/>
                            <Calendario/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default PaginaCalendario;
