import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTile, selectTile } from '../actions';
import { Tile } from '../components/Tile';
import { ItemTypes } from '../Constants';
import { useDrag, useDrop } from 'react-dnd';

import './PlayerTile.css';
import { MahjongState } from '../reducers';

type Props = {
	index: number;
	tileSuit: string;
	tileType: string;
	meldable: boolean;
};

export const PlayerTile = ({ index, tileSuit, tileType, meldable }: Props) => {
	const { selectedTileIndex, currentState } = useSelector(
		({ player }: MahjongState) => player,
	);
	const dispatch = useDispatch();

	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: ItemTypes.PLAYER_TILE,
		hover(item: any, monitor) {
			// Disable hover if player is supposed to drag tiles to revealed melds
			if (currentState === 'REVEAL_MELD') {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (!ref.current || dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();

			const hoverMiddleX =
				(hoverBoundingRect.right - hoverBoundingRect.left) / 2;

			const clientOffset = monitor.getClientOffset();

			if (clientOffset) {
				const hoverClientX = clientOffset.x - hoverBoundingRect.left;

				if (
					(dragIndex < hoverIndex && hoverClientX < hoverMiddleX) ||
					(dragIndex > hoverIndex && hoverClientX > hoverMiddleX)
				) {
					return;
				}
			}

			dispatch(moveTile(dragIndex, hoverIndex));

			item.index = hoverIndex;
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
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	// Default style options
	let opacity = 1;
	let cursor = 'grab';

	if (currentState === 'REVEAL_MELD' && !meldable) {
		opacity = 0.5;
		cursor = 'not-allowed';
	}

	if (isDragging) {
		opacity = 0;
	}

	const isSelected = index === selectedTileIndex;
	let className = 'tileDiv';
	if (currentState === 'DISCARD_TILE' && isSelected) {
		className += ' selected';
	}
	if (currentState === 'REVEAL_MELD' && meldable) {
		className += ' hoverTileDiv';
	}

	const handleMouseUp = () => {
		if (currentState === 'DISCARD_TILE') {
			dispatch(selectTile(index));
		}
	};

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity,
				cursor,
			}}
			onMouseUp={handleMouseUp}
		>
			<Tile suit={tileSuit} type={tileType} selected={isSelected} />
		</div>
	);
};
