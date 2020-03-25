import React from 'react';
import { connect } from 'react-redux';
import { extendNewMeld, showMeldableTiles } from '../actions';
import { ItemTypes } from '../Constants';
import { useDrop } from 'react-dnd';
import PlayerMelds from './PlayerMelds';

import './PlayerMeldsContainer.css';

const PlayerMeldsContainer = ({
	currentState,
	showMeldableTiles,
	extendNewMeld,
}) => {
	console.log('Rendering <PlayerMeldsContainer />');

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		canDrop: (item) => currentState === 'DISCARD_TILE',
		drop(item, monitor) {
			console.log('Dispatching showMeldableTiles');
			showMeldableTiles(item.index);
			console.log('Dispatching extendNewMeld');
			extendNewMeld(item.index);
		},
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	console.log('isOver', isOver);

	let className = 'player-melds-container';
	if (canDrop && isOver) {
		console.log('hovering melds container');
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

const mapStateToProps = state => ({
	currentState: state.player.currentState,
});

const mapDispatchToProps = dispatch => ({
	showMeldableTiles: (tileIndex) => dispatch(showMeldableTiles(tileIndex)),
	extendNewMeld: (tileIndex) => dispatch(extendNewMeld(tileIndex)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PlayerMeldsContainer);

