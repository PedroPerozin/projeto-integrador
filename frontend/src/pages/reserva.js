import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'

class Reserva extends Component {


  constructor(props) {
    super(props);

    this.state = {
      room: '',
      day_end: '',
      day_begin: '',
      hour: [],
      day: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/api/reserves/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        "user": "vitor@vitor.com",
        "room": (this.state.room).toUpperCase(),
        "status": "pending",
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
              <Form>
                <h1 className="h3 mb-3 font-weight-normal">Reserva</h1>

                <FormGroup>
                  <Label for="exampleAddress">Sala</Label>
                  <Input type="text"
                    name="sala"
                    id="sala"
                    placeholder="Digite uma sala"
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

                <FormGroup tag="fieldset">
                  <Label>Dia da Semana</Label>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "2" })}
                          />{' '}
                          Segunda-feira
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "3" })}
                          />{' '}
                          Terça-feira
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "4" })}
                          />{' '}
                          Quarta-feira
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "5" })}
                          />{' '}
                          Quinta-feira
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "6" })}
                          />{' '}
                          Sexta-feira
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "7" })}
                          />{' '}
                          Sábado
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio"
                            name="radio1"
                            onChange={(e) => this.setState({ day: "1" })}
                          />{' '}
                          Domingo
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label>Horário</Label>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="m1"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "m1"] })}
                          />{' '}M1 07:30
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="m2"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "m2"] })}
                          />{' '}M2 08:20
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="m3"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "m3"] })}
                          />{' '}M3 09:10
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="m4"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "m4"] })}
                          />{' '}M4 10:20
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="m5"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "m5"] })}
                          />{' '}M5 11:10
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="m6"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "m6"] })}
                          />{' '}M6 12:00
                          </Label>
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="t1"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "t1"] })}
                          />{' '}T1 13:00
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="t2"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "t2"] })}
                          />{' '}T2 13:50
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="t3"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "t3"] })}
                          />{' '}T3 14:40
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="t4"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "t4"] })}
                          />{' '}T4 15:50
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="t5"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "t5"] })}
                          />{' '}T5 16:40
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="t6"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "t6"] })}
                          />{' '}T6 17:30
                          </Label>
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="n1"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "n1"] })}
                          />{' '}N1 18:40
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="n2"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "n2"] })}
                          />{' '}N2 19:30
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="n3"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "n3"] })}
                          />{' '}N3 20:20
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="n4"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "n4"] })}
                          />{' '}N4 21:20
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                            name="n5"
                            onChange={(e) => this.setState({ hour: [...this.state.hour, "n5"] })}
                          />{' '}N5 22:10
                          </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                </FormGroup>
                <Button color="primary"
                  onClick={this.handleSubmit}
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
