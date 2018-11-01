import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'

var horarios = ['m1','m2','m3','m4','m5','m6','t1','t2','t3','t4','t5','t6','n1','n2','n3','n4','n5']

class Reserva extends Component {


  constructor(props) {
    super(props);

    this.state = {
      room: '',
      day_end: '',
      day_begin: '',
      hourb: 'm1',
      houre: 'm1',
      day: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    var hourlist = [];
    var between = false;
    var i;
    for(i = 0;i < horarios.length; i++){
      if(horarios[i] === this.state.hourb.toLowerCase())
        between = true;
      if(between == true)
        hourlist.push(horarios[i])
      if(horarios[i] === this.state.houre.toLowerCase())
        break;
    }
    console.log(hourlist);
    fetch("http://localhost:3001/api/reserves/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        "user": "vitor@vitor.com",
        "room": (this.state.room).toUpperCase(),
        "status": "pendente",
        "date": [{
          "day_begin": this.state.day_begin,
          "day_end": this.state.day_end,
          "day": this.state.day,
          "hour": this.state.hour
        }]

      })
    }).then((response) => response.json()).then((json) => {
      if (json.success) {
        alert("Pedido de reserva enviado com sucesso.");

      }
      else {
        alert("Não foi possível realizar o pedido de reserva");
      }
    }).catch(error => {
      alert("Não foi possível conectar com o servidor. Tente novamente mais tarde");
    });
  }

  render() {
    return (

      <div>
        <MainNavbar />
        <br />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 11, offset: 1 }}>
                <Form onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Reserva</h1>

                <FormGroup>
                  <Label for="exampleAddress">Sala</Label>
                  <Input type="text"
                    name="sala"
                    id="sala"
                    placeholder="Ex: e007"
                    onChange={(e) => this.setState({ room: e.target.value })} />
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="exampleDate">Data de Inicio</Label>
                      <Input type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                        onChange={(e) => this.setState({ day_begin: e.target.value })} />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label for="exampleDate">Data Final</Label>
                      <Input type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                        onChange={(e) => this.setState({ day_end: e.target.value })} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="exampleSelect">Horário Inicial</Label>
                      <Input type="select" name="select" id="exampleSelect" onChange={(e) => {this.setState({hourb:e.target.value.substring(0,2)})}}>
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
                  <Col>
                    <FormGroup>
                      <Label for="exampleSelect">Horário Inicial</Label>
                      <Input type="select" name="select" id="exampleSelect" onChange={(e) => {this.setState({houre:e.target.value.substring(0,2)})}}>
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

                <FormGroup>
                  <Label for="exampleSelect">Frequência</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>Não se repete</option>
                    <option>Todo dia</option>
                    <option>Semanalmente</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">Justificativa</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>

                <Button color="primary"
                >Solicitar Reserva</Button>
              </Form>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Reserva;
