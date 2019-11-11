import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';

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
			<form onSubmit={this.handleSubmit} style={{ display: 'flex', padding: 10, borderTop: 1, borderTopStyle: 'solid', }}>
				<input
					ref={(input) => { this.messageInput = input; }}
					type="text"
					value={this.state.message}
					onChange={this.handleChange}
					style={{ display: 'flex', flex: 1 }} />
				<input type="submit" value="Send" style={{ display: 'flex' }} />
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

