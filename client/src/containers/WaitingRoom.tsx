import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../actions';

import './WaitingRoom.css';

export const WaitingRoom = () => {
	const { opponents, isHost, playerName } = useSelector(
		({ player, opponents }: { player: any; opponents: any[] }) => ({
			opponents,
			isHost: player.isHost,
			playerName: player.username,
		}),
	);

	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(startGame());
	};

	const aiOpponents = [];
	for (let i = 0; i < 3 - opponents.length; i++) {
		aiOpponents.push(
			<tr key={`ai-player-${i}`}>
				<td>AI-Player-{i}</td>
				<td>AI</td>
			</tr>,
		);
	}

	return (
		<div className="div__waiting-room" data-testid="waiting-room">
			<table className="waiting-room__opponents-table">
				<thead>
					<tr>
						<th>Player Name</th>
						<th>Human/AI</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{playerName} (You)</td>
						<td>Human</td>
					</tr>
					{opponents.map((opponent, idx) => (
						<tr key={`player-${idx}`}>
							<td>{opponent.name}</td>
							<td>Human</td>
						</tr>
					))}
					{aiOpponents}
				</tbody>
			</table>
			{(!!isHost && (
				<button className="waiting-room__start-game-btn" onClick={handleClick}>
					Start Game
				</button>
			)) || (
				<div className="waiting-room__waiting-message">
					Waiting for host to start game...
				</div>
			)}
		</div>
	);
};
