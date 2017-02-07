import React, {Component} from "react";

import "../styles/components/Navbar.sass";

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			modal: false
		};
	}

	componentWillReceiveProps() {
		if(this.props.appStateModal === false) {
			this.setState({
				modal: false
			});
		}
	}

	handleModal = () => {
		if(this.state.modal === false) {
			this.props.modal(true);
			this.setState({
				modal: true
			});
			
		} else {
			this.props.modal(false);
			this.setState({
				modal: false
			});
		}
	}

	render() {
		return (
			<nav className="Navbar">
				<ul>
					<li>
						<a href="#"> Home </a>
					</li>

					<li>
						<a href="#"> Dropdown </a>
						<ul>
							<li>
								<a href="#">Sub menu item 1</a>
								<ul>
									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>
								</ul>
							</li>

							<li>
								<a href="#">Sub menu item 1</a>
								<ul>
									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>
								</ul>
							</li>

							<li>
								<a href="#">Sub menu item 1</a>
								<ul>
									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>
								</ul>
							</li>

							<li>
								<a href="#">Sub menu item 1</a>
								<ul>
									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>
								</ul>
							</li>

							<li>
								<a href="#">Sub menu item 1</a>
								<ul>
									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>
								</ul>
							</li>

							<li>
								<a href="#">Sub menu item 1</a>
								<ul>
									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>

									<li>
										<a href="#">Sub menu item 2</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>

					<li>
						<a href="#"> About </a>
					</li>

					<li>
						<a href="#" onClick={this.handleModal}> Feedback </a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;