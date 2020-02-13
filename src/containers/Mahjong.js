import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import Chatroom from './Chatroom';
import LandingPage from './LandingPage';
import WaitingRoom from '../components/WaitingRoom';

import './Mahjong.css';

function Mahjong({ inGame, isGameInProgress }) {
	console.log('Re-rendering Mahjong container')

	const getInnerComponent = () => {
		return (
			<>
				<div className='mahjong-inner-container'>
					{
						(inGame && ((isGameInProgress && <Board />) || <WaitingRoom />)) || <LandingPage />
					}
				</div>
				<Chatroom />
			</>
		);
	};

	return (
		<div className='mahjong-container'>
			{ getInnerComponent() }
		</div>
	);

}

const mapStateToProps = state => ({
	inGame: state.player.inGame,
	isGameInProgress: state.player.isGameInProgress,
});

export default connect(
	mapStateToProps,
	null,
)(Mahjong);

