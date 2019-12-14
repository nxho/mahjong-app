import React from 'react';
import { connect } from 'react-redux';
import { extendNewMeld, showMeldableTiles } from '../actions';
import { ItemTypes } from '../Constants';
import { useDrop } from 'react-dnd';
import PlayerMelds from './PlayerMelds';

import './MeldsContainer.css';

// TODO: rename to PlayerMeldsContainer?
const MeldsContainer = ({
	currentState,
	showMeldableTiles,
	extendNewMeld,
}) => {
	console.log('Rendering <MeldsContainer />');

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		canDrop: (item) => currentState === 'REVEAL_MELD',
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
		className += ' player-melds-container--state-hover';
	}

	return (
		<div ref={drop} className={className}>
			<div className='player-melds-container-title'>Your Revealed Melds</div>
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
)(MeldsContainer);

