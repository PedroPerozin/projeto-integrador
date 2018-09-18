import React, { Component } from 'react';
import {
    Container, Col, Form,
     Input,
    Button, Row
} from 'reactstrap';
import Calendario from '../componentes/calendario.js'
import MainNavbar from '../componentes/MainNavbar.js'


class PaginaCalendario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sala:'',
            events:''
        }
        this.updateEvents = this.updateEvents.bind(this)
    }

    updateEvents(e){
        /* faz o update dos eventos */
        e.preventDefault()
        this.setState({events: [
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
            }
        ] });

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
                            <Calendario events={this.state.events}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default PaginaCalendario;
