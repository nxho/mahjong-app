import React from 'react';
import { connect } from 'react-redux';

import './Mahjong.css';
import Board from './Board';
import Chatroom from './Chatroom';
import LandingPage from './LandingPage';
import WaitingRoom from '../components/WaitingRoom';

const containerStyle = {
	height: window.innerHeight,
};

function Mahjong({ opponents, player }) {
	const isEnoughPlayers = () => {
		return opponents.length >= 3;
	};

	if (!player.inGame) {
		return (
			<div className='container' style={containerStyle}>
				<LandingPage />
			</div>
		);
	}

	return (
		<div className='container' style={containerStyle}>
			{
				(isEnoughPlayers() && <Board />) || <WaitingRoom />
			}
			<Chatroom />
		</div>
	);
}

const mapStateToProps = state => ({
	opponents: state.opponents,
	player: state.player,
});

export default connect(
	mapStateToProps,
	null,
)(Mahjong);

