import React, {Component} from "react";

import "../styles/components/Header.sass";

import Navbar from "./Navbar.jsx";

class Header extends Component {

	render() {
		return (
			<header>
				<Navbar modal={this.props.modal} appStateModal={this.props.appStateModal} />
			</header>
		);
	}
}

export default Header;