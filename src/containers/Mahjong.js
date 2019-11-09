import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import Chatroom from './Chatroom';
import LandingPage from './LandingPage';
import WaitingRoom from '../components/WaitingRoom';

const containerStyle = {
	display: 'flex',
	flexDirection: 'row',
	flex: 1,
	height: window.innerHeight,
};

function Mahjong({ opponents, player }) {
	const isEnoughPlayers = () => {
		return opponents.length >= 3;
	};

	if (!player.roomId) {
		return <LandingPage />;
	}

	return (
		<div style={containerStyle}>
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

