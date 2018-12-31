import React, { Component } from 'react';
/* Import css style */
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import ethereumsvg from '../images/ethereum.svg';
import supply from '../images/supply.svg';
/* Util */
import initWeb3 from '../utils/initWeb3';
import * as eth from '../ethereum/ethereumController.js';
import config from '../config';
/* React Components */
import { Button } from 'reactstrap';
import Solicitudes from './Solicitudes';
import Header from './Header';
import Footer from './Footer';

class Proveedor extends Component {
	constructor(props) {
		super(props)
		this.state = { web3: '', defaultaccount: '0x0', contract: '', contractaddress: '0x0', solicitudes: '' }
	}

	async componentWillMount() {
		console.log("* * COMPONENT WILL MOUNT ")
		this.setState({
			web3: await eth.web3,
			defaultaccount: await eth.getDefaultAccount(),
			contract: await eth.contract,
			contractaddress: await eth.address,
			solicitudes: await eth.getAllSolicitudes()
		})
	}

	async componentDidUpdate() {
		console.log(" * * Component Did UPDATE * *")
		eth.getEvent().then(event => {
			console.log("- - ComponentdidMount EVENTTTTT - - ")
			this.getAllSolicitudes()
		})
		eth.getMetamaskEvent().then(event => {
			console.log("- - ComponentdidMount EVENTTTTT - - ")
			window.location.reload()
		})

	}

	async solicitar(_producto, _precio) {
		console.log(this.state.web3.utils.toWei(_precio))
		var x = await eth.solicitar(_producto, this.state.web3.utils.toWei(_precio))
		console.log(x)
	}

	async getSolicitudByID(_id) {
		eth.getSolicitudByID(_id).then(x => {
			this.setState({
				solicitudes: x
			})
		})
	}

	async getAllSolicitudes() {
		eth.getAllSolicitudes().then(x => {
			this.setState({
				solicitudes: x
			})
		})

	}

	async getAllSolicitudesByAddress(_address) {
		eth.getAllSolicitudesByAddress(_address).then(x => {
			this.setState({
				solicitudes: x
			})
		})
	}

	async getAllSolicitudesForProvider(_address) {
		eth.getAllSolicitudesForProvider(_address).then(x => {
			this.setState({
				solicitudes: x
			})

		})
	}

	render() {
		console.log("* * Component APP Render * *")

		//TODO: ERROR Please pass numbers as strings or BigNumber objects to avoid precision errors.

		return (
			<div className="App">
				<Header defaultaccount={this.state.defaultaccount} contractaddress={this.state.contractaddress} />

				<header className="App-header">
					<h1 className="tittle">Proveedor </h1>
					<p className="subtittle"> Cubre demandas de clientes</p>
					<hr className="my-2" />
					<img className="image-supply" src={supply} alt="Supply" />
					<hr className="my-2" />
					<p className="subtittle">  </p>

					<br></br>

					<div>
						<br></br>
						<Button className="button" color="secondary" onClick={e => this.getAllSolicitudes()}> Ver todas</Button>
						<Button className="button" color="secondary" onClick={e => this.getAllSolicitudesForProvider(this.state.defaultaccount)}> Mostrar mi histórico </Button>
						<br></br>
						<input className="input" id="input3" ref="search" placeholder="Identificador de solicitud"></input>
						<Button className="button" color="secondary" onClick={e => this.getSolicitudByID(String(this.refs.search.value))}> Ver demanda</Button>

					</div>
				</header>

				{this.state.solicitudes ?
					<div className="App-body">
						{this.state.solicitudes &&
							<Solicitudes solicitudes={this.state.solicitudes} action="CUBRIR"></Solicitudes>
						}
						<Footer />
					</div>

					: <div>
						<img src={ethereumsvg} className="App-logo" alt="logo" /><h2>Cargando...</h2>
					</div>
				}

			</div>
		);
	}
}

export default Proveedor;