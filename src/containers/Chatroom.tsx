import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Chatroom.css';

import { MessageList } from './MessageList';
import { MessageForm } from './MessageForm';
import { MahjongState } from '../reducers';
import { leaveGame } from '../actions';

export const Chatroom = () => {
	const { roomId, messages, inGame } = useSelector(
		({ player, messages }: MahjongState) => ({
			roomId: player.roomId,
			inGame: player.inGame,
			messages,
		}),
	);
	const dispatch = useDispatch();

	return (
		<div className="chatroom">
			<div className="header">
				<div className="header__row">
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
				<div className="header__row2">
					{inGame && (
						<button
							className="button__leave-game"
							onClick={() => dispatch(leaveGame())}
						>
							Leave Game
						</button>
					)}
				</div>
			</div>
			<div className="div__message-container">
				<MessageList messages={messages} />
				<MessageForm />
			</div>
		</div>
	);
};
