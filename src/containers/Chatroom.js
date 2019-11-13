import React from 'react';
import { connect } from 'react-redux';
import './Chatroom.css';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

// can convert into functional component,
// possibly also use hooks to get messages from state? not sure
function Chatroom({ messages, player, }) {
	return (
		<div className='chatroom'>
			<div>
				<div className='header'>
					<div>Chatroom</div>
					<div>Room ID: {player.roomId}</div>
				</div>
				<MessageList messages={messages} />
			</div>
			<MessageForm />
		</div>
	);
}

const mapStateToProps = state => ({
	messages: state.messages,
	player: state.player,
});

export default connect(
	mapStateToProps,
	null,
)(Chatroom);

