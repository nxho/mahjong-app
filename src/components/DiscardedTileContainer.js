import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile';
import { ItemTypes } from '../Constants';
import { useDrop } from 'react-dnd';

import './DiscardedTileContainer.css';

const DiscardedTileContainer = ({ discardedTile, pastDiscardedTiles, currentState }) => {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		canDrop: (item) => currentState === 'DISCARD_TILE',
		drop(item, monitor) {
		},
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	console.log('DiscardedTileContainer isOver', isOver);

	let enableHelperText = false;
	let containerClassName = 'discarded-tile-container';
	if (canDrop && isOver) {
		console.log('hm');
		containerClassName += ' discarded-tile-container--state-hover';
	}

	return (
		<div ref={drop} className={containerClassName}>
			<div className='discarded-tile-container__helper-text'>{canDrop ? (isOver ? 'Release to discard' : 'Drag here to discard') : ''}</div>
			<div className='discarded-tile-container__past-tiles'>
				{ !!pastDiscardedTiles && discardedTile && pastDiscardedTiles.concat([discardedTile]).map((tile, index) => (
					<div className='discarded-tile-container__tile' key={index}>
						<Tile
							suit={tile.suit}
							type={tile.type}
						/>
					</div>
				))
				}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	currentState: state.player.currentState,
});

export default connect(
	mapStateToProps,
	null,
)(DiscardedTileContainer);

