import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Chatroom.css';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

import { registerEventHandler } from '../actions';

class Chatroom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
		}
	}

	componentDidMount = () => {
		this.props.socket.on('text_message', (message) => {
			this.setState({
				messages: [...this.state.messages, message]
			});
		});
	}

	render() {
		return (
			<div className='chatroom'>
				<div>
					<div className='header'>Chatroom</div>
					<MessageList messages={this.state.messages} />
				</div>
				<MessageForm />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	socket: state.socket,
});

export default connect(
	mapStateToProps,
	null,
)(Chatroom);

