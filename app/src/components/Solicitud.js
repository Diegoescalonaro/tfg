import React, { Component } from 'react';
import '../styles/App.css';
import web3 from 'web3';

class Solicitud extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log("* * Component SOLICITUD Render * *")
		var item = this.props.item

		console.log("state"+this.props.solicitudes[item].state)

		return (
			<div className="div-solicitud">
				<p className="h4"> · Solicitud ID: {this.props.solicitudes[item].id} </p>
				<p className="lead"> <i>State:</i> {this.props.solicitudes[item].state}</p>
				<p className="lead"> <i>Info:</i> {this.props.solicitudes[item].info}</p>
				<p className="lead"> <i>Price:</i> {web3.utils.fromWei(this.props.solicitudes[item].price)} ETH</p>
				<p className="lead"><i>Owner:</i> {this.props.solicitudes[item].owner}</p>
				<p className="lead"><i>Provider:</i> {this.props.solicitudes[item].provider}</p>
				<img className="img-state" src={require(`../images/state${this.props.solicitudes[item].state}.png`)}/>
			</div>
		)
	}

}
export default Solicitud
