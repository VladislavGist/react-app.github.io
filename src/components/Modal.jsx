import React, {Component} from "react";
import ReactDOM from "react-dom";

import "../styles/components/Modal.sass";
import NewPhoneInputBtn from "./NewPhoneInputBtn.jsx";

class Modal extends Component {
	constructor() {
		super();
		this.state = {
			items: [],
			name: "",
			email: "",
			phoneNumber0: "",
			textContent: "",
			cnt: 0
		}
	}

	closeModal = () => {
		this.props.closeModal(false);
	}

	//добавление новой кнопки при клике на +
	closePhoneInput = e => {
		this.state.items.push(
			<NewPhoneInputBtn key={Date.now()} createElems={this.closePhoneInput} changeValNumber={this.validateNumber} thisState={this.state.cnt} />
		);
		this.forceUpdate();

		//для кождого нового поля создавать новое состоние
		let newState = "phoneNumber" + ++this.state.cnt;
		this.setState({
			[newState]: ""
		});

		//при валидации проверять каждоей новое созданное поле
	}

	//функция валидации поля
	//аргументы: принимаемый элемент ввода, регулярное выражение, свойство состояния, класс нового элемента
	validate = (e, regexp, thisState, classNewEl) => {
		let el = e.target.value;

		if(el.match(regexp)) {
			let el = document.getElementsByClassName(classNewEl);

			if(el.length > 0) e.target.parentNode.removeChild(el[0]);
		
			this.setState({
				[thisState]: true
			});

		} else if(e.target.value.length == 0) {
			let el = document.getElementsByClassName(classNewEl);

			if(el.length > 0) e.target.parentNode.removeChild(el[0]);
			
			this.setState({
				[thisState]: true
			});

		} else {
			let elemError = document.createElement("p");
			elemError.classList.add("errorInput");
			elemError.classList.add(classNewEl);
			elemError.innerHTML = "Error data";

			//следующий элемент от текущего
			let nextEl = e.target.parentNode.childNodes[1];

			//если элемент с таким то классом отсутствует и следующий эл. от текущего отсутствует
			if(document.getElementsByClassName(classNewEl).length == 0 && nextEl == null) {
				e.target.parentNode.appendChild(elemError);
			}
			
			this.setState({
				[thisState]: false
			});
		}
	}

	//функция валидации name
	changeValidateNameInput = (e) => {
		let regexpName = /(^[a-zа-я]{1}([a-z]{0,13})?$)|(^[A-Z]{1}([a-z]{0,12})?$)|(^[а-я]{1,14}$)|(^[А-Я]{1}([а-я]{0,13})?$)/;
		this.validate(e, regexpName, "name", "inputNameError");
	}

	//функция валидации инпута email
	changeValidateEmail = (e) => {
		let regexpName = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
		this.validate(e, regexpName, "email", "inputMailError");
	}

	//функция валидации инпута phoneNumber
	validateNumber = e => {
		let regexpName = /^([+]?[0-9\s-\(\)]{8,25})*$/i;

		let el = document.getElementsByClassName("phoneNumber");

		//получить максимальное число
		//с с него присваивать индексы на убывание
		for(let i = 0; i < el.length; i++) {
			this.validate(e, regexpName, "phoneNumber" + i, "inputPhoneError" + i);
		}
	}

	//функция валидации textarea
	chanheValidateTextarea = (e) => {
		let regexpName = /\w/;
		this.validate(e, regexpName, "textContent", "textAreaError");
	}
 
	//кнопка reset
	resetForm = () => {
		this.setState({
			items: [],
			name: "",
			email: "",
			phoneNumber0: "",
			textContent: "",
			cnt: 0
		});

		let formInputs = document.getElementsByTagName("input"), textarea = document.getElementsByTagName("textarea");

		for(let i = 0; i < formInputs.length; i++) {
			formInputs[i].value = "";
		}

		for(let i = 0; i < textarea.length; i++) {
			textarea[i].value = "";
		}

		for(let i = 0; i <= textarea.length - 1; i++) {
			if(textarea[i].nextSibling !== null && textarea[i].nextSibling !== undefined) {
				textarea[i].nextSibling.remove();
			}
		}

		for(let i = 0; i <= formInputs.length - 1; i++) {
			if(formInputs[i].nextSibling !== null && formInputs[i].nextSibling !== undefined) {
				formInputs[i].nextSibling.remove();
			}
		}
	}

	//показать не заполненные поля
	showElementError = el => {
		let elemError = document.createElement("p");
		if(el[0].nextSibling == null) {
			elemError.classList.add("errorInput");
			elemError.innerHTML = "Error data";
			el[0].parentNode.appendChild(elemError);
		}
		
	}

	//проверка состояния полей
	//аргументы: свойство состояния, класс элемента
	testStateElement = (stateName, classElement) => {
		if(this.state[stateName] === false || this.state[stateName] === "") {
			let el = document.getElementsByClassName(classElement);
			this.showElementError(el);

		} else {
			let el = document.getElementsByClassName(classElement);
			if(el[0].nextSibling !== null) {
				el[0].nextSibling.remove();
			}

			this.setState({
				[stateName]: true
			});
		}
	}
 
 	//кнопка submit
 	submitForm = () => {
 		let success = false;

 		//кроссбраузерная функция httpRequest
 		function getXMLHttpRequest() {
			if(window.XMLHttpRequest) {
				try {return new XMLHttpRequest();}
				catch(e) {}
				
			} else if(window.activeXObject) {
				try {return new activeXObject("Msxml2.XMLHTTP");}
				catch(e) {}

				try {return new activeXObject("Mircosoft.XMLHTTP");}
				catch(e) {}

			}
			return null;
		}

		//запрос к серверу
		function showDemoSample() {
			let request = getXMLHttpRequest();
			
			//адресс куда обращаемся
			let url = location.href;

			//подготавливает запрос. аргументы: http метод запроса, url, асинхронность true/false
			request.open("GET", url, true);

			//отправка запроса
			request.send(null);

			//свойство onreadystatechange(состояние запроса) имеет несколько состояний
			//1 - посылаю запрос, 2 - запрос послал, 3 - принимаю запрос, 4 - запрос принял
			//присваеваем ей функцию обработчик события
			request.onreadystatechange = () => {

				//request.readyState возвращает состояние onreadystatechange (1, 2, 3, 4)
				if(request.readyState === 4) {

					//проверяем заголовок пришедших данных
					if(request.status !== 200) {
						alert(`${request.status}, ${request.statusText}`);

					} else {
						if(document.getElementsByClassName("successMess").length == 0) {
			 				let successMess = document.createElement("p");
			 				successMess.classList.add("successMess");
			 				successMess.innerHTML = "Сообщение отправлено";

			 				let el = document.getElementsByTagName("form");
			 				el[0].appendChild(successMess);
						}
					}
				}
			}
		}

 		//если все поля заполнены, то отправляем форму
 		if(this.state.name === true && this.state.email === true && this.state.phoneNumber0 === true && this.state.textContent === true) {
 			success = true;

 			if(success == true) {
 				//запрос к серверу
				showDemoSample();
				this.resetForm();
 			}

 		//если хотя бы одно из полей не заполнено, то выводим ошибку у не заполненых полей
 		} else {
 			success = false;
			this.testStateElement("name", "nameInput");
			this.testStateElement("email", "mailInput");

			let el = document.getElementsByClassName("phoneNumber");
			for(let i = 0; i < el.length; i++) {
				this.testStateElement("phoneNumber" + i, "phoneNumber" + i);
			}

			this.testStateElement("textContent", "textArea");
 		}
 	}

	render() {
		return (
			<div className={`modal ${this.props.classToggle}`}>
				<div className="bgModal" onClick={this.closeModal}></div>
				<div className="container">
					<a href="#" className="closeBtn" onClick={this.closeModal}>X</a>
					<form>
						<p className="formTitle">Feedback</p>
						<label>
							<span>Your name:</span>
							<div>
								<input type="text" onChange={this.changeValidateNameInput} className={`nameInput ${this.state.name === false ? "error" : ""}`} />
							</div>
						</label>

						<label>
							<span>Your email:</span>
							<div>
								<input type="text" onChange={this.changeValidateEmail} className={`mailInput ${this.state.email === false ? "error" : ""}`} />
							</div>
						</label>

						<div className="phonesLabels">
							<NewPhoneInputBtn createElems={this.closePhoneInput} changeValNumber={this.validateNumber} thisState={this.state.cnt} />
							{
								this.state.items.map((elem, idx) => {
									return elem
								})
							}
						</div>

						<label>
							<span>Message:</span>
							<div>
								<textarea onChange={this.chanheValidateTextarea} className={`textArea ${this.state.textContent === false ? "error" : ""}`} />
							</div>
						</label>

						<div className="buttons">
							<div className="wrapBtns">
								<a href="javascript:void(0)" onClick={this.resetForm}>Clear</a>
								<a href="javascript:void(0)" onClick={this.submitForm}>Submit</a>
							</div>
						</div>	
					</form>
				</div>

			</div>
		);
	}
}

export default Modal;