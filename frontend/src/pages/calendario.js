import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row
} from 'reactstrap';
import fullCalendar from 'fullcalendar';
import $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/locale/pt-br.js'
import MainNavbar from '../componentes/MainNavbar.js'


class Calendario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sala:'',
            events: [
                {
                    title: 'Aula 1',
                    start: '2018-09-17T07:30',
                    end: '2018-09-17T10:10'
                },
                {
                    title: 'Aula 2',
                    start: '2018-09-17T10:20',
                    end: '2018-09-17T12:00'
                },
                {
                    title: 'Aula 3',
                    start: '2018-09-17T13:50',
                    end: '2018-09-17T15:30'
                },
                {
                    title: 'Aula 4',
                    start: '2018-09-17T15:50',
                    end: '2018-09-17T17:30'
                },
                {
                    title: 'Aula 5',
                    start: '2018-09-17T18:40',
                    end: '2018-09-17T21:10'
                },
                {
                    title: 'Aula 6',
                    start: '2018-09-17T21:20',
                    end: '2018-09-17T23:30'
                },
            ]
        }
        this.updateEvents = this.updateEvents.bind(this)
    }

    componentDidMount() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: false,
            droppable: false,
            locale: 'pt-br',
            navLinks: true,
            displayEventEnd: true,
            minTime:'07:30:00',
            timeFormat:'h:mm',
        });
    }

    updateEvents(e){
        /* faz o update dos eventos */
        e.preventDefault()
        $('#calendar').fullCalendar( 'removeEvents');
        $('#calendar').fullCalendar('addEventSource', this.state.events);
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
                                    onChange={(e) => this.setState({sala: e.target.value.toLowerCase()})}
                                    placeholder="Sala (ex:e007 ou E007)"
                                    onSubmit={this.updateEvents}
                                />
                            </Form>
                        </Col>
                        <Col>
                            <Button color="primary" onClick={this.updateEvents}>OK</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br/>
                            <div id="calendar"></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default Calendario;
