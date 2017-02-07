import React, {Component} from "react";
import ReactDOM from "react-dom";

import "../styles/components/Modal.sass";

class NewPhoneInputBtn extends Component {

	valNumber = e => {
		this.props.changeValNumber(e);
	}

	render() {
		return (
			<label className="phoneLabel">
				<span>Your phone:</span>
				<div className="wrapInsideLabel">
					<div>
						<input type="text" onChange={this.valNumber} className={`phoneNumber phoneNumber${this.props.thisState}`} />
					</div>
					<a href="javascript:void(0)" className="btnAddInput" onClick={this.props.createElems}>+</a>
				</div>
			</label>
		);
	}
}

export default NewPhoneInputBtn;