import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./principal.css";



class Principal extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }



    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }
    render() {
        return (


            <div className="App">
                <header style={{ height: "250px", background: " #1a1a1a" }} >
                    <div style={{
                        marginTop: '5%',
                        float: "left",
                        width: "200px",
                        height: "40px",
                        marginLeft: "5%",
                        border: "0",
                        padding: "0",
                        lineHeight: "40px",

                    }}>
                        <div style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "30px",
                            textAlign: "center",
                            lineHeight: "40px",
                        }}
                            onClick={this.showMenu}><b> Show menu </b></div>
                        {
                            this.state.showMenu
                                ? (
                                    <div className="menu">
                                        <button style={{ background: "none", border: "none", color: "white", fontSize: "15px", }}> <b>Menu item 1</b></button>
                                        <button style={{ background: "none", border: "none", color: "white", fontSize: "15px", }}> <b>Menu item 2</b></button>
                                        <button style={{ background: "none", border: "none", color: "white", fontSize: "15px", }}> <b>Menu item 3</b></button>
                                    </div>
                                )
                                : (
                                    null
                                )
                        }
                    </div>
                    <div style={{
                        marginTop: '5%',
                        float: "left",
                        width: "200px",
                        height: "40px",
                        marginLeft: "5%",
                        border: "0",
                        padding: "0",
                    }}>
                        <button onClick={this.showMenu}>
                            Show menu2
              </button>
                        {
                            this.state.showMenu
                                ? (
                                    <div className="menu">
                                        <button> Menu item 1.1 </button>
                                        <button> Menu item 2.1 </button>
                                        <button> Menu item 3.1 </button>
                                    </div>
                                )
                                : (
                                    null
                                )
                        }
                    </div>
                </header>
            </div>
        );//className="App-header"
    }
}

export default Principal;