import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ItemData extends Component {
    constructor(props){
        super(props);

        this.state = {
            frequencia: 'Não se repete'
        }
    }

    render(){
        return(
        <Row>
            <Col xs="auto">
                <FormGroup>
                    <Label for="exampleDate">Data de Inicio</Label>
                    <Input type="date"
                        name="day_begin"
                        id={this.props.id}
                        placeholder="date placeholder"
                        onChange={this.props.onChange} />
                </FormGroup>
            </Col>

            <Col xs="auto">
                <FormGroup>
                    <Label for="exampleDate">Data Final</Label>
                    <Input type="date"
                        name="day_end"
                        id={this.props.id}
                        placeholder="date placeholder"
                        disabled={this.state.frequencia === 'Não se repete'}
                        onChange={this.props.onChange} />
                </FormGroup>
            </Col>
            <Col xs="auto">
                <FormGroup>
                    <Label for="exampleSelect">Frequência</Label>
                    <Input type="select" name="frequencia" id={this.props.id}
                        onChange={e => {this.setState({frequencia: e.target.value });this.props.onChange(e)}}>
                        <option>Não se repete</option>
                        <option>Todo dia</option>
                        <option>Semanalmente</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xs="auto">
                <FormGroup>
                    <Label for="exampleSelect">Horário Inicial</Label>
                    <Input type="select" name="hourb" id={this.props.id}
                        onChange={this.props.onChange}>
                        <option>M1 07:30</option>
                        <option>M2 08:20</option>
                        <option>M3 09:10</option>
                        <option>M4 10:20</option>
                        <option>M5 11:10</option>
                        <option>M6 12:00</option>
                        <option>T1 13:00</option>
                        <option>T2 13:50</option>
                        <option>T3 14:40</option>
                        <option>T4 15:50</option>
                        <option>T5 16:40</option>
                        <option>T6 17:30</option>
                        <option>N1 18:40</option>
                        <option>N2 19:30</option>
                        <option>N3 20:20</option>
                        <option>N4 21:20</option>
                        <option>N5 22:10</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xs="auto">
                <FormGroup>
                    <Label for="exampleSelect">Horário Final (incluso)</Label>
                    <Input type="select" name="houre" id={this.props.id}
                        onChange={this.props.onChange}>
                        <option>M1 07:30</option>
                        <option>M2 08:20</option>
                        <option>M3 09:10</option>
                        <option>M4 10:20</option>
                        <option>M5 11:10</option>
                        <option>M6 12:00</option>
                        <option>T1 13:00</option>
                        <option>T2 13:50</option>
                        <option>T3 14:40</option>
                        <option>T4 15:50</option>
                        <option>T5 16:40</option>
                        <option>T6 17:30</option>
                        <option>N1 18:40</option>
                        <option>N2 19:30</option>
                        <option>N3 20:20</option>
                        <option>N4 21:20</option>
                        <option>N5 22:10</option>
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        );
    }
}
