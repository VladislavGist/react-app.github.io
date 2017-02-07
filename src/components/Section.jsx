import React, {Component} from "react";

import "../styles/components/Section.sass";

import Element from "./Element.jsx";

class Section extends Component {
	render() {
		return (
			<section className="Section">
				<Element />
				<Element />
				<Element />
				<Element />
			</section>
		);
	}
}

export default Section;