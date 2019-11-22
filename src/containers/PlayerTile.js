import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { moveTile, selectTile } from '../actions';
import TileContent from './TileContent';
import { ItemTypes } from '../Constants';
import { useDrag, useDrop } from 'react-dnd';

import './PlayerTile.css'

const PlayerTile = ({ index, selectedTileIndex, tileSuit, tileType, selectTile, moveTile }) => {
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		hover(item, monitor) {
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
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;

	drag(drop(ref));

	const selected = index === selectedTileIndex;
	return (
		<div
			ref={ref}
			className={selected ? ' selected' : 'tileDiv'}
			style={{
				opacity,
				cursor: 'grab',
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
});

const mapDispatchToProps = dispatch => ({
	moveTile: (dragIndex, hoverIndex) => dispatch(moveTile(dragIndex, hoverIndex)),
	selectTile: (index) => dispatch(selectTile(index)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PlayerTile);

