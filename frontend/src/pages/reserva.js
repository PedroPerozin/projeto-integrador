import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import MainNavbar from '../componentes/MainNavbar.js'
import moment from 'moment'
import { getEmail } from '../authToken.js'
import ItemData from '../componentes/itemdata.js' 

var horarios = ['m1','m2','m3','m4','m5','m6','t1','t2','t3','t4','t5','t6','n1','n2','n3','n4','n5']

class Reserva extends Component {

  constructor(props) {
    super(props);

    this.state = {
      salas: '',
      room: '',
      day_end: [],
      day_begin: [],
      hourb: [],
      houre: [],
      day: [],
      frequencia: [],
      justificativa: '',
      dates:[],
      datesCount: 0,
      maxDatesCount:0

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.addDate = this.addDate.bind(this);
    this.removeDate = this.removeDate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

    onChange(e){
        var a = this.state[e.target.name];
        if(e.target.name === 'hourb' || e.target.name === 'houre')
            a[e.target.id] = e.target.value.substring(0,2);
        else
            a[e.target.id] = e.target.value;
        this.setState({ [e.target.name]: a});
        
    }

    removeDate(){
        var count = this.state.datesCount - 1;
        if (count <= 0)
            return;
        var new_day_begin = [...this.state.day_begin];
        new_day_begin[this.state.datesCount - 1] = '';
        var new_day_end = [...this.state.day_end];
        new_day_end[this.state.datesCount - 1] = '';
        var new_hourb = [...this.state.hourb];
        new_hourb[this.state.datesCount - 1] = 'M1';
        var new_houre = [...this.state.houre];
        new_houre[this.state.datesCount - 1] = 'M1';
        var new_frequencia = [...this.state.frequencia];
        new_frequencia[this.state.datesCount - 1] = 'Não se repete';
        this.setState({
            day_begin: new_day_begin,
            day_end: new_day_end,
            hourb: new_hourb,
            houre: new_houre,
            frequencia: new_frequencia,
            datesCount: count
        });
    }

    addDate(){
      var count = this.state.datesCount + 1;
      if (count > this.state.maxDatesCount)
        this.setState(prevState => ({
            day_end: [...prevState.day_end, ''],
            day_begin: [...prevState.day_begin, ''],
            hourb: [...prevState.hourb, 'M1'],
            houre: [...prevState.houre, 'M1'],
            day: [...prevState.day, ''],
            frequencia: [...prevState.frequencia, 'Não se repete'],
            datesCount: count,
            maxDatesCount: count
        }));
      else{
          this.setState(prevState => ({
          datesCount: count,
        }));
      }
    }

  componentWillMount(){
    fetch("http://localhost:3001/api/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => response.json()).then((json) => {
      if (json.success) {
          var salas = [<option key="NULO"> </option>];
        for(var i = 0;i < json.data.rooms.length;i++){
            salas.push(<option key={json.data.rooms[i]._id}>{json.data.rooms[i].cod}</option>)
        }
        this.setState({salas:salas});
        this.addDate();

      }
      else {
          alert("Não foi possível obter as salas");
      }
    }).catch(error => {
      alert("Não foi possível conectar com o servidor para obter as salas. Tente novamente mais tarde");
    });
    
  }

  onClick(e){
      this.setState({datesCount:this.state.datesCount + 1});
      console.log(this.state.datesCount);
  }

  handleSubmit(e) {
    e.preventDefault();
    var reserve = {
        "user": getEmail(),
        "room":this.state.room.toUpperCase(),
        "status": "pendente",
        "date":[],
        "justification":this.state.justificativa
    };
    for(var j = 0;j < this.state.datesCount;j++){
    
        var hourlist = [];
        var between = false;
        var i;
        for(i = 0;i < horarios.length; i++){
          if(horarios[i] === this.state.hourb[j].toLowerCase())
            between = true;
          if(between == true)
            hourlist.push(horarios[i])
          if(horarios[i] === this.state.houre[j].toLowerCase())
            break;
        }
        if(this.state.day_begin[j] === ''){
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
        if(this.state.frequencia[j] !== 'Não se repete' && new Date(this.state.day_begin[j]) > new Date(this.state.day_end[j])){
            alert("Data de inicio maior que data de fim");
            return;
        }
        if(this.state.frequencia[j] === 'Não se repete'){
          reserve.date.push({
            "day_begin": this.state.day_begin[j],
            "day_end": this.state.day_begin[j],
            "day": moment(this.state.day_begin[j]).day()+1,
            "hour" : hourlist
            });
          
        }
        else if(this.state.frequencia[j] === 'Semanalmente'){
          if(this.state.day_end[j] === ''){
              alert("Selecione uma data de fim");
              return;
          }
          reserve.date.push({
            "day_begin": this.state.day_begin[j],
            "day_end": this.state.day_end[j],
            "day": moment(this.state.day_begin[j]).day()+1,
            "hour" : hourlist
            });
        }
        else if(this.state.frequencia[j] === 'Todo dia'){
          if(this.state.day_end[j] === ''){
              alert("Selecione uma data de fim");
              return;
          }
            let d = new Date(this.state.day_begin[j]);
            let d2 = new Date(this.state.day_end[j]);
            var days = [];
            var daybegins = [];
            for(i = 0;i < 7 && d <= d2; i++){
                days.push(d.getDay()+2);
                daybegins.push(d.getFullYear() + '-' + ('0' + (d.getUTCMonth()+1)).slice(-2) + '-' + ('0' + (d.getUTCDate())).slice(-2))
                d.setDate(d.getDate()+1);
            }
            var dates = []
            for(i = 0;i < days.length;i++){
                if(days[i] == 8){
                    days[i] = 1;
                }
                reserve.date.push({
                    'day_begin':daybegins[i],
                    'day_end':this.state.day_end[j],
                    'day':days[i],
                    'hour':hourlist
                });
            }
        }
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
      var d = []
      for(var i = 0; i < this.state.datesCount;i++){
          d.push(<ItemData key ={i} id={i} frequencia={this.state.frequencia[i]} onChange={this.onChange}/>);
        }
    return (

      <div>
        <MainNavbar />
        <br />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 11, offset: 1 }}>
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

                { d  }
                <Row>
                    <Col xs="auto">
                        <Button color='primary' size='sm' onClick={this.addDate}>Adicionar Data</Button>
                    </Col>
                    <Col xs="auto">
                        <Button color='danger' size='sm' onClick={this.removeDate}>Remover Data</Button>
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

              <Form onSubmit={this.handleSubmit}>
                <Button color="success" size='lg' block
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
