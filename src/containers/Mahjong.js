import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import Chatroom from './Chatroom';
import LandingPage from './LandingPage';
import WaitingRoom from '../components/WaitingRoom';

import './Mahjong.css';

function Mahjong({ opponentsLength, inGame }) {
	console.log('Re-rendering Mahjong container')

	const isEnoughPlayers = () => {
		return opponentsLength >= 3;
	};

	const getInnerComponent = () => {
		if (inGame) {
			return (
				<>
					{
						(isEnoughPlayers() && <Board />) || <WaitingRoom />
					}
					<Chatroom />
				</>
			);
		}

		return <LandingPage />
	};

	return (
		<div className='mahjong-container'>
			{ getInnerComponent() }
		</div>
	);

}

const mapStateToProps = state => ({
	opponentsLength: state.opponents.length,
	inGame: state.player.inGame,
});

export default connect(
	mapStateToProps,
	null,
)(Mahjong);

