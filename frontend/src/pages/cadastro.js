import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cadastro extends Component {

	render() {
		return(
			<div>
				<h1>Cadastro</h1>
				Já é cadastrado? <Link to="/">Faça login.</Link>
			</div>
		);
	}

}

export default Cadastro;
