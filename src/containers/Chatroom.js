import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Chatroom.css';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

class Chatroom extends Component {
	constructor(props) {
		super(props);

		// TODO: store messages on server?
		// or at least update messages from server so that messages sent before
		// a user joins can be seen as well
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

