import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Alert
} from "reactstrap";
import ItemReserva from '../componentes/itemlistareserva.js'

class ListagemReservasPendentes extends Component {
  constructor(props) {
    super(props);

    this.state = {
            listaReserva:[],
      statusMessage:'',
      reserva: null
    };

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
          if(this.state.listaReserva.length == 0){
            this.setState({ statusMessage: <Alert color='success'> Nenhuma reserva encontrada </Alert>});
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

          var size = json.data.reserves.length
          for (var i = 0; i < size; i++) {
            a.push(json.data.reserves.pop());
          }
          this.setState({ listaReserva: a });
          if(a.length != 0){
            this.setState({listaReserva:a, statusMessage:''});
          }
          else {
            this.setState({ statusMessage: <Alert color='success'> Nenhuma reserva encontrada </Alert>});
          }
        } else {
        }
      })
      .catch(error => {
        this.setState({statusMessage: <Alert color="danger"> Não foi possível conectar com o servidor </Alert>});
      });
  }

  render() {
    return (
        <div>
            <Container>
                {this.state.statusMessage}
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
