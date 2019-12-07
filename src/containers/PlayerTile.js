import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { moveTile, selectTile } from '../actions';
import TileContent from './TileContent';
import { ItemTypes } from '../Constants';
import { useDrag, useDrop } from 'react-dnd';

import './PlayerTile.css'

const PlayerTile = ({ index, selectedTileIndex, tileSuit, tileType, meldable, currentState, selectTile, moveTile }) => {
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		hover(item, monitor) {
			// Disable hover if player is supposed to drag tiles to revealed melds
			if (currentState === 'REVEAL_MELD') {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (!ref.current || dragIndex === hoverIndex) {
				return
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();

			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

			const clientOffset = monitor.getClientOffset()

			const hoverClientX = clientOffset.x - hoverBoundingRect.left

			if ((dragIndex < hoverIndex && hoverClientX < hoverMiddleX)
				|| (dragIndex > hoverIndex && hoverClientX > hoverMiddleX)) {
				return
			}

			moveTile(dragIndex, hoverIndex);

			item.index = hoverIndex
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item: {
			type: ItemTypes.PLAYER_TILE,
			index,
			tileSuit,
			tileType,
			meldable,
		},
		canDrag: () => currentState !== 'REVEAL_MELD' || meldable,
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	// Default opacity
	let opacity = 1;

	if (currentState === 'REVEAL_MELD' && !meldable) {
		opacity = 0.5;
	}

	if (isDragging) {
		opacity = 0;
	}

	drag(drop(ref));

	let className = 'tileDiv';
	let cursor = 'grab';
	className += currentState === 'DISCARD_TILE' && index === selectedTileIndex ? ' selected' : '';

	if (currentState === 'REVEAL_MELD') {
		if (meldable) {
			className += ' hoverTileDiv';
		} else {
			cursor = 'default';
		}
	}
	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity,
				cursor,
			}}
			onMouseUp={() => selectTile(index)}
		>
			<TileContent
				suit={tileSuit}
				type={tileType}
			/>
		</div>
	);
};

const mapStateToProps = state => ({
	selectedTileIndex: state.player.selectedTileIndex,
	currentState: state.player.currentState,
});

const mapDispatchToProps = dispatch => ({
	moveTile: (dragIndex, hoverIndex) => dispatch(moveTile(dragIndex, hoverIndex)),
	selectTile: (index) => dispatch(selectTile(index)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PlayerTile);

