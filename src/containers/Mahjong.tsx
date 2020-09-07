import React from 'react';
import { useSelector } from 'react-redux';

import { Board } from './Board';
import { Chatroom } from './Chatroom';
import { LandingPage } from './LandingPage';
import { WaitingRoom } from './WaitingRoom';
import { MahjongState } from '../reducers';

import './Mahjong.css';

export const Mahjong = () => {
	const { inGame, isGameInProgress } = useSelector(
		({ player }: MahjongState) => ({
			inGame: player.inGame,
			isGameInProgress: player.isGameInProgress,
		}),
	);

	console.log('Re-rendering Mahjong container');

	const getInnerComponent = () => {
		if (!inGame) {
			return <LandingPage />;
		}

		if (!isGameInProgress) {
			return <WaitingRoom />;
		}

		return <Board />;
	};

	return (
		<div className="mahjong-container">
			<div className="mahjong-inner-container">{getInnerComponent()}</div>
			<Chatroom />
		</div>
	);
};
