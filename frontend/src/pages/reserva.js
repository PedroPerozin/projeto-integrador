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
                  <Label for="exampleSelectMulti">Horário</Label>
                  <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
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