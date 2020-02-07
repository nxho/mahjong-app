import React from 'react';
import { connect } from 'react-redux';
import './Chatroom.css';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

function Chatroom({ messages, player }) {
	return (
		<div className='chatroom'>
			<div className='header'>
				<div>Chatroom</div>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					{ (!!player.roomId &&
						<>
							<div className='room-id-title'>Room ID:</div>
							<div id='room-id'>{player.roomId}</div>
						</>) || <div className='room-id-title'>Lobby</div>
					}
				</div>
			</div>
			<div className='div__message-container'>
				<MessageList messages={messages} />
				<MessageForm />
			</div>
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

