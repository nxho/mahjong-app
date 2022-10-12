import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extendNewMeld, showMeldableTiles } from '../actions';
import { ItemTypes } from '../Constants';
import { useDrop } from 'react-dnd';
import { PlayerMelds } from './PlayerMelds';

import './PlayerMeldsContainer.css';
import { MahjongState } from '../reducers';

export const PlayerMeldsContainer = () => {
	console.log('Rendering <PlayerMeldsContainer />');

	const { currentState } = useSelector(({ player }: MahjongState) => player);

	const dispatch = useDispatch();

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		canDrop: () => currentState === 'REVEAL_MELD',
		drop(item: any) {
			console.log('Dispatching showMeldableTiles');
			dispatch(showMeldableTiles(item.index));
			console.log('Dispatching extendNewMeld');
			dispatch(extendNewMeld(item.index));
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	console.log('isOver', isOver);

	let className = 'player-melds-container';
	if (canDrop && isOver) {
		className += ' player-melds-container--state-hover';
	}

	return (
		<div ref={drop} className={className}>
			{/*
			<div className='player-melds-container-title'>Your Revealed Melds</div>
			*/}
			<PlayerMelds />
		</div>
	);
};
