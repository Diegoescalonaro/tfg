import React, { Component } from 'react';
import '../styles/App.css';
//import * as eth from '../ethereum/ethereumController.js';

import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
// import { Link } from 'react-router-dom';

export default class Solicitud extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        console.log("* * Component HEADER Render * *")

        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand className="nav-item-text" href="/">SUPPLY LINK</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-item-text" href="/home/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-item-text" href="/perfil/">Perfil</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="nav-item-text" nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                            </DropdownItem>
                                <DropdownItem>
                                    Option 2
                            </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>

        )
    }

}