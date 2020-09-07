import React from 'react';
import { leaveGame } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

import './Overlay.css';
import { MahjongState } from '../reducers';

export const Overlay = () => {
	const { currentState } = useSelector(({ player }: MahjongState) => player);
	const dispatch = useDispatch();

	const text = 'YOU ' + (currentState === 'WIN' ? 'WIN' : 'LOSE >:)');

	return (
		<div className="overlay">
			<h1 className="overlay__heading">{text}</h1>
			<button className="overlay__button" onClick={() => dispatch(leaveGame())}>
				Quit Game
			</button>
		</div>
	);
};
