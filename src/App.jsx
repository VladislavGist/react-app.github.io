import React, {Component} from "react";

import "./App.sass";

import Header from "./components/Header.jsx";
import Section from "./components/Section.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal.jsx";

class App extends Component {
	constructor() {
		super();
		this.state = {
			modal: false
		};

	}

	toggleModal = (booleanModal) => {
		this.setState({
			modal: booleanModal
		});
	}

	render() {
		return (
			<div className="App">
				<div className="wrap container">
					<Header modal={this.toggleModal} appStateModal={this.state.modal} />
					<Section />
				</div>
				<Footer />
				<Modal classToggle={this.state.modal === true ? "open" : "close"} closeModal={this.toggleModal} />
			</div>
		);
	}
};

export default App;