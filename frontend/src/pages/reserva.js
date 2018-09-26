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
                            <Input type="checkbox" name="m1" />{' '}M1 07:30
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="m2" />{' '}M2 08:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="m3" />{' '}M3 09:10
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="m4" />{' '}M4 10:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="m5" />{' '}M5 11:10
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="m6" />{' '}M6 12:00
                          </Label>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="t1" />{' '}T1 13:00
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="t2" />{' '}T2 13:50
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="t3" />{' '}T3 14:40
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="t4" />{' '}T4 15:50
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="t5" />{' '}T5 16:40
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="t6" />{' '}T6 17:30
                          </Label>
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="n1" />{' '}N1 18:40
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="n2" />{' '}N2 19:30
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="n3" />{' '}N3 20:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="n4" />{' '}N4 21:20
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="n5" />{' '}N5 22:10
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