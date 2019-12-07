import React from 'react';
import { connect } from 'react-redux';
import { extendRevealedMelds, showMeldableTiles } from '../actions';
import { ItemTypes } from '../Constants';
import { useDrop } from 'react-dnd';
import Melds from './Melds';

import './MeldsContainer.css';

const MeldsContainer = ({
	currentState,
	showMeldableTiles,
	extendRevealedMelds,
}) => {
	console.log('Rendering <MeldsContainer />');

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		canDrop: (item) => currentState === 'REVEAL_MELD',
		drop(item, monitor) {
			console.log('Dispatching showMeldableTiles');
			showMeldableTiles(item.index);
			console.log('Dispatching extendRevealedMelds');
			extendRevealedMelds(item.index);
		},
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	console.log('isOver', isOver);

	let className = 'melds-container';
	if (canDrop && isOver) {
		className += ' melds-container--state-hover';
	}

	return (
		<div ref={drop} className={className}>
			<div className='melds-container-title'>Your Revealed Melds</div>
			<Melds />
		</div>
	);
};

const mapStateToProps = state => ({
	currentState: state.player.currentState,
});

const mapDispatchToProps = dispatch => ({
	showMeldableTiles: (tileIndex) => dispatch(showMeldableTiles(tileIndex)),
	extendRevealedMelds: (tileIndex) => dispatch(extendRevealedMelds(tileIndex)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MeldsContainer);

