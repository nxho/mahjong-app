import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions';

import './WaitingRoom.css';

// TODO: move this to containers/ folder because we're using redux for this component
const WaitingRoom = ({ isHost, opponents, playerName, startGame }) => {
	let aiOpponents = [];
	for (let i = 0; i < 3 - opponents.length; i++) {
		aiOpponents.push(
			<tr key={`ai-player-${i}`}>
				<td>AI-Player-{i}</td>
				<td>AI</td>
			</tr>
		);
	}

	return (
		<div className='div__waiting-room' data-testid='waiting-room'>
			<table className='waiting-room__opponents-table'>
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
					{
						opponents.map((opponent, idx) => (
							<tr key={`player-${idx}`}>
								<td>{opponent.name}</td>
								<td>Human</td>
							</tr>
						))
					}
					{ aiOpponents }
				</tbody>
			</table>
			{ (!!isHost && <button className='waiting-room__start-game-btn' onClick={startGame}>Start Game</button>) || <div className='waiting-room__waiting-message'>Waiting for host to start game...</div> }
		</div>
	);
};

const mapStateToProps = state => ({
	opponents: state.opponents,
	isHost: state.player.isHost,
	playerName: state.player.username,
});

const mapDispatchToProps = dispatch => ({
	startGame: () => dispatch(startGame()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WaitingRoom);

