import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Chatroom.css';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

// can convert into functional component,
// possibly also use hooks to get messages from state? not sure
class Chatroom extends Component {
	render() {
		return (
			<div className='chatroom'>
				<div>
					<div className='header'>Chatroom</div>
					<MessageList messages={this.props.messages} />
				</div>
				<MessageForm />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	messages: state.messages,
});

export default connect(
	mapStateToProps,
	null,
)(Chatroom);

