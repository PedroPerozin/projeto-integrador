import React, { Component } from 'react';

import classnames from 'classnames';

import {
    Badge, Form, Container,
    Input, Nav, NavItem, Row, Col,
    TabContent, TabPane, NavLink
} from 'reactstrap';


import MainNavbar from '../componentes/MainNavbar.js'
import ImportarCSV from '../componentes/importarcsv.js';
import ListagemReserva from '../componentes/listagemdereserva';
import GerenciamentoEquipamentos from '../componentes/gerenciarequipamentos';

export default class PainelADM extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.toggle = this.toggle.bind(this);
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (

            <div>
                <MainNavbar />
                <Container>
                    <br />
                    <Row>
                        <Col xs="4"></Col>
                        <Col xs="auto"><h3><b>Painel do Administrador</b></h3></Col>
                        <br />
                        <Col xs="4"></Col>
                    </Row>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >Listagem de Reservas
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                Importar CSV
                        </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}>
                                Gerenciamento de Equipamentos
                        </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggle('4'); }}>
                                Autenticação sistema academico
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <br />
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                            <ListagemReserva />
                        </TabPane>
                        
                        <TabPane tabId="2">
                            <ImportarCSV />
                        </TabPane>
                       
                        <TabPane tabId="3">
                            <GerenciamentoEquipamentos />
                        </TabPane>

                        <TabPane tabId="4">
                            Componente pagina autenticação do sistema academico
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
        )
    }
}