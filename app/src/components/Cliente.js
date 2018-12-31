import React, { Component } from 'react';
import '../styles/App.css';
import * as eth from '../ethereum/ethereumController.js';
import ethereumsvg from '../images/ethereum.svg';
import supply from '../images/supply.svg';
/* React Components */
import Header from './Header';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Solicitudes from './Solicitudes';

/* Config */
import config from '../config';

export default class Proveedor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultaccount: '',
            contractaddress: '',
            solicitudes: '',
            data: false
        }
    }

    async componentWillMount() {
        this.setState({
            defaultaccount: await eth.getDefaultAccount(),
            contractaddress: eth.address,
        })
        this.getAllMySolicitudes()
    }


    async componentDidUpdate() {
        console.log(" * * Component Did UPDATE * *")
        eth.getEvent().then(event => {
            console.log("- - ComponentdidMount EVENTTTTT - - ")
            this.getAllMySolicitudes()
        })
        eth.getMetamaskEvent().then(event => {
            console.log("- - ComponentdidMount EVENTTTTT - - ")
            window.location.reload()
        })

    }

    async getAllMySolicitudes() {
        eth.getAllSolicitudesByAddress(this.state.defaultaccount).then(result => {
            this.setState({
                solicitudes: result,
                data: false
            })
        })
    }

    getData() {
        this.setState({
            solicitudes: false,
            data: true
        })
    }

    render() {
        var etherscanaccount = `https://${config.network}.etherscan.io/address/${this.state.defaultaccount}`
        var etherscancontract = `https://${config.network}.etherscan.io/address/${this.state.contractaddress}`

        console.log("* * Component PERFIL Render * *")
        return (
            <div className="App">
                <Header defaultaccount={this.state.defaultaccount} contractaddress={this.state.contractaddress} />

                <header className="App-header">
                    <h1 className="tittle">Cliente</h1>
                    <p className="subtittle"> Demanda productos a proveedores y valida todo el proceso sobre blockchain.</p>
                    <hr className="my-2" />
                    <img className="image-supply" src={supply} alt="Supply" />
                    <hr className="my-2" />

                    <div>
                        <input className="input" ref="producto" type="text" placeholder="producto a demandar"></input>
                        <input className="input" id="input2" ref="precio" type="number" placeholder="precio ETH"></input>
                        <Button className="button" color="primary" onClick={e => this.solicitar(this.refs.producto.value, this.refs.precio.value)}> SOLICITAR</Button>
                    </div>
                </header>

                <div className="App-body">
                    <Button className="button" color="secondary" onClick={e => this.getAllMySolicitudes()}> Mostrar mis solicitudes</Button>
                    <Button className="button" color="secondary" onClick={e => this.getData()}> Datos </Button>

                    {this.state.solicitudes ?
                        <Solicitudes className="button" solicitudes={this.state.solicitudes} action="VALIDAR"></Solicitudes>
                        : <img src={ethereumsvg} className="App-logo" alt="logo" />
                    }
                    {this.state.data ?
                        <div className="profile-data">
                            <p className="h4" >Ethereum network: <a href={"https://kovan.etherscan.io/"}>  {config.network}</a></p>
                            <p className="h4" >Default Account (Metamask):	<a href={etherscanaccount}>{this.state.defaultaccount}></a></p>
                            <p className="h4" >Smart Contract: <a href={etherscancontract}>{this.state.contractaddress}</a></p>
                        </div>
                        : <br></br>}
                    <br></br><br></br>
                    <Link className="link" to="/home">Back to home</Link>
                </div>
            </div>
        )
    }

}