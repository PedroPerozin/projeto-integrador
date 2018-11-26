import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import ItemReserva from '../componentes/itemlistareserva.js'

class ListagemReservasPendentes extends Component {
  constructor(props) {
    super(props);

    this.state = {
            listaReserva:[{
                _id:'',
                room:{cod:''},
                status:'',
                date:[],
                justification:'',
                user:{
                    name:'',
                    email:'',
                }
            }] ,
      reserva: null
    };

    this.getDatas = this.getDatas.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    let action = e.target.value;
    let id = e.target.id;
    await fetch(`http://localhost:3001/api/reserves/${e.target.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: action }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          this.state.reserva = json.data.reserve;
          alert(`Reserva ${action} com sucesso`);
          for (var i = 0;i < this.state.listaReserva.length;i++){
              if (id === this.state.listaReserva[i]._id){
                  var l = this.state.listaReserva;
                  l.splice(i,1);
                  this.setState({listaReserva:l});
                  break;
                }
          }
          // window.location.reload();
        } else {
          // alert("Reserva não encontrada");
        }
      })
      .catch(error => {
        alert(
          "Não foi possível conectar com o servidor. Tente novamente mais tarde"
        );
      });

    if (this.state.reserva) {
      await fetch(`http://localhost:3001/api/users/send-email`, {
        method: "POST",
        body: JSON.stringify({
          email: this.state.reserva.user.email,
          message: `Olá ${
            this.state.reserva.user.name
              ? this.state.reserva.user.name
              : this.state.reserva.user.email
          }
          A reserva que você solicitou para ${
            this.state.reserva.date.day_begin
          } à ${this.state.reserva.date.day_end} na sala ${
            this.state.reserva.room.cod
          } foi ${action}!`
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            // alert(
            //   `O email de informação foi enviado para ${
            //     this.state.reserva.user.email
            //   }`
            // );
          } else {
            alert(
              `Não foi possível enviar o email para ${
                this.state.reserva.user.email
              }`
            );
          }
        })
        .catch(error => {
          alert(
            "Não foi possível conectar com o servidor. Tente novamente mais tarde"
          );
        });
    }
  }

  genDatas(d) {
    var day_begin = new Date(d.day_begin);
    var day_end = new Date(d.day_end);
    // console.log(day_begin);
    // console.log(day_begin.getUTCDate());
    //day_begin.setDate(day_begin.getDate()+1);
    //day_end.setDate(day_begin.getDate()+1);

    var datas = [];
    var key = 0;
    while (day_begin <= day_end) {
      datas.push(
        <div key={key}>
          <Row>
            <Col xs="2">
              {("0" + day_begin.getUTCDate()).slice(-2) +
                "/" +
                ("0" + (day_begin.getUTCMonth() + 1)).slice(-2) +
                "/" +
                day_begin.getFullYear()}
            </Col>
            <Col>
              {d.hour[0]} - {d.hour[d.hour.length - 1]}
            </Col>
          </Row>
        </div>
      );
      day_begin.setDate(day_begin.getDate() + 7);
      key++;
    }
    return datas;
  }

  getDatas(date) {
    var datas = [];
    if (date) {
      return date.map(d => (
        <div key={d._id}>
          <Row>
            <Col>{this.genDatas(d)}</Col>
          </Row>
          <Row />
        </div>
      ));
    }
  }

  componentWillMount() {
    fetch("http://localhost:3001/api/reserves/filter/pendente", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          var listReserve = [];
          var a = [];

          for (var i = 0; i < json.data.reserves.length; i++) {
            a.push(json.data.reserves.pop());
          }
          this.setState({ listaReserva: a });
        } else {
          this.setState({
            listaReserva: "Não foi possível obter as reservas"
          });
        }
      })
      .catch(error => {
        this.setState({ listaReserva: "Falha na conexão com o servidor." });
        alert(
          "Não foi possível conectar com o servidor. Tente novamente mais tarde"
        );
      });
  }

  render() {
    return (
        <div>
            <Container>
                <ListGroup>
                    {

                        this.state.listaReserva.map( r => {
                            return(
                                <ItemReserva key={r._id} reserva={Object.assign({},r)} handleClick={this.handleClick} tipo='adm'/>
                            )
                        })

                    }

                </ListGroup>
            </Container>
        </div>
    );
  }
}

export default ListagemReservasPendentes;
