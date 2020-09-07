import React from 'react';
import { useSelector } from 'react-redux';
import './Chatroom.css';

import { MessageList } from './MessageList';
import { MessageForm } from './MessageForm';
import { MahjongState } from '../reducers';

export const Chatroom = () => {
	const { roomId, messages } = useSelector(
		({ player, messages }: MahjongState) => ({
			roomId: player.roomId,
			messages,
		}),
	);
	return (
		<div className="chatroom">
			<div className="header">
				<div>Chatroom</div>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					{(!!roomId && (
						<>
							<div className="room-id-title">Room ID:</div>
							<div id="room-id">{roomId}</div>
						</>
					)) || <div className="room-id-title">Lobby</div>}
				</div>
			</div>
			<div className="div__message-container">
				<MessageList messages={messages} />
				<MessageForm />
			</div>
		</div>
	);
};
