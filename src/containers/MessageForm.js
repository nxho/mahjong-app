import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';

import './MessageForm.css';

// TODO: this is very similar to UsernameForm.js
// create a root component and have each inherit from the root?
class MessageForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '',
		}
	}

	componentDidMount() {
		this.messageInput.focus();
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.sendMessage(this.state.message);

		this.setState({
			message: '',
		});
	}

	handleChange = (e) => {
		this.setState({
			message: e.target.value,
		});
	}

	render() {
		return (
			<form className='form__message-form' onSubmit={this.handleSubmit}>
				<input
					ref={(input) => { this.messageInput = input; }}
					className='input__message-form-text'
					type="text"
					value={this.state.message}
					onChange={this.handleChange}
				/>
				<button className='button__message-form-submit' type="submit">Send</button>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	sendMessage: (message) => dispatch(sendMessage(message)),
});

export default connect(
	null,
	mapDispatchToProps,
)(MessageForm);

