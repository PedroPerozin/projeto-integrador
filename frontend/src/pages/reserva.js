import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'
import moment from 'moment'

var horarios = ['m1','m2','m3','m4','m5','m6','t1','t2','t3','t4','t5','t6','n1','n2','n3','n4','n5']

class Reserva extends Component {

  constructor(props) {
    super(props);

    this.state = {
      salas: '',
      room: '',
      day_end: '',
      day_begin: '',
      hourb: 'm1',
      houre: 'm1',
      day: '',
      frequencia: 'Não se repete',
      justificativa: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    fetch("http://localhost:3001/api/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => response.json()).then((json) => {
      if (json.success) {
          var salas = [<option> </option>];
        for(var i = 0;i < json.data.rooms.length;i++){
            salas.push(<option>{json.data.rooms[i].cod}</option>)
        }
        this.setState({salas:salas});

      }
      else {
          alert("Não foi possível obter as salas");
      }
    }).catch(error => {
      alert("Não foi possível conectar com o servidor para obter as salas. Tente novamente mais tarde");
    });
    
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
    if(this.state.day_begin === ''){
        alert("Escolha uma data de inicio");
        return;
    }
    if(hourlist.length == 0){
        alert("Horário de inicio maior que horário de fim");
        return;
    }
    if(this.state.justificativa === ""){
        alert("Justificativa em branco");
        return;
    }
    if(this.state.frequencia !== 'Não se repete' && new Date(this.state.day_begin) > new Date(this.state.day_end)){
        alert("Data de inicio maior que data de fim");
        return;
    }
    var reserve = {
        "user":"nome@email.com",
        "room":this.state.room.toUpperCase(),
        "status": "pendente",
    };
    if(this.state.frequencia === 'Não se repete'){
      reserve.date = [{
        "day_begin": this.state.day_begin,
        "day_end": this.state.day_begin,
        "day": moment(this.state.day_begin).day()+1,
        "hour" : hourlist
        }]
      
    }
    else if(this.state.frequencia === 'Semanalmente'){
      if(this.state.day_end === ''){
          alert("Selecione uma data de fim");
          return;
      }
      reserve.date = [{
        "day_begin": this.state.day_begin,
        "day_end": this.state.day_end,
        "day": moment(this.state.day_begin).day()+1,
        "hour" : hourlist
        }]
    }
    else if(this.state.frequencia === 'Todo dia'){
      if(this.state.day_end === ''){
          alert("Selecione uma data de fim");
          return;
      }
        let d = new Date(this.state.day_begin);
        let d2 = new Date(this.state.day_end);
        var days = [];
        var daybegins = [];
        for(i = 0;i < 7 && d <= d2; i++){
            days.push(d.getDay()+2);
            daybegins.push(d.getFullYear() + '-' + (d.getMonth()+1) + '-' + (d.getDate()+1))
            d.setDate(d.getDate()+1);
        }
        var dates = []
        for(i = 0;i < days.length;i++){
            if(days[i] == 8){
                days[i] = 1;
            }
            dates.push({
                'day_begin':daybegins[i],
                'day_end':this.state.day_end,
                'day':days[i],
                'hour':hourlist
            });
        }
        reserve.date = dates;
    }
        
    console.log(reserve);
    fetch("http://localhost:3001/api/reserves/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
          ...reserve

      })
    }).then((response) => response.json()).then((json) => {
      if (json.success) {
        alert("Pedido de reserva enviado com sucesso.");

      }
      else {
          alert("Não foi possível realizar o pedido de reserva, motivo:\n" + json.message);
          console.log(json.message);
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

                <Row>
                    <Col xs="auto">
                <FormGroup>
                  <Label for="exampleAddress">Sala</Label>
                  <Input type="select" name="select" id="exampleSelect" onChange={(e) => {this.setState({ room:e.target.value })}}>
                      {this.state.salas}
                  </Input>
                </FormGroup>
                </Col>
                </Row>

                <Row>
                  <Col xs="auto">
                    <FormGroup>
                      <Label for="exampleDate">Data de Inicio</Label>
                      <Input type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                        onChange={(e) => this.setState({ day_begin: e.target.value })} />
                    </FormGroup>
                  </Col>

                  <Col xs="auto">
                    <FormGroup>
                      <Label for="exampleDate">Data Final</Label>
                      <Input type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                        disabled={this.state.frequencia === 'Não se repete'}
                        onChange={(e) => this.setState({ day_end: e.target.value })} />
                    </FormGroup>
                  </Col>
                  <Col xs="auto">
                <FormGroup>
                  <Label for="exampleSelect">Frequência</Label>
                  <Input type="select" name="select" id="exampleSelect" onChange={(e) => {this.setState({ frequencia:e.target.value });console.log(e.target.value);}}>
                    <option>Não se repete</option>
                    <option>Todo dia</option>
                    <option>Semanalmente</option>
                  </Input>
                </FormGroup>
            </Col>
                  <Col xs="auto">
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
                  <Col xs="auto">
                    <FormGroup>
                      <Label for="exampleSelect">Horário Final (incluso)</Label>
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

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="exampleText">Justificativa</Label>
                      <Input type="textarea" name="text" id="exampleText" onChange={(e) => {this.setState({ justificativa:e.target.value })}}/>
                    </FormGroup>
                  </Col>
                </Row>

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
