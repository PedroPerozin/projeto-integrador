import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class Reserva extends Component {
  render() {
    return (

      <div><br/>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 11, offset: 1 }}>
              <Form>
                <h1 className="h3 mb-3 font-weight-normal">Reserva</h1>

                <FormGroup>
                  <Label for="exampleAddress">Sala</Label>
                  <Input type="text" name="sala" id="sala" placeholder="Digite uma sala"/>
                </FormGroup>
                
                <FormGroup>
                  <Label for="exampleDate">Data</Label>
                  <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                </FormGroup>
                
                <FormGroup>
                  <Label>Horário</Label>
                    <Row>
                      <Col>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}M1 07:30
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}M2 08:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}M3 09:10
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}M4 10:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}M5 11:10
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}M6 12:00
                          </Label>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}T1 13:00
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}T2 13:50
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}T3 14:40
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}T4 15:50
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}T5 16:40
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}T6 17:30
                          </Label>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}N1 18:40
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}N2 19:30
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}N3 20:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}N4 21:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}N5 22:10
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>

                </FormGroup>
                <Button color="primary">Solicitar Reserva</Button>
              </Form>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

  export default Reserva;