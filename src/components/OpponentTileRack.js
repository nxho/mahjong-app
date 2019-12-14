import React from 'react';
import HiddenTile from './HiddenTile';
import Melds from './Melds';

import './OpponentTileRack.css';

const OpponentTileRack = ({ revealedMelds, tileCount, position }) => {
	let tiles = [];
	for (let i = 0; i < tileCount; i++) {
		tiles.push(
			<HiddenTile
				key={i}
				position={position}
			/>
		);
	}

	let rotation = '180';
	let direction = 'row';
	if (position === 'left') {
		rotation = 'cw'
		direction = 'column';
	} else if (position === 'right') {
		rotation = 'ccw'
		direction = 'column';
	}

	return (
		<div className={`opponent-tile-rack opponent-tile-rack-${position}`}>
			{tiles}
			{
				<Melds
					melds={revealedMelds}
					direction={direction}
					tileRotation={rotation}
				/>
			}
		</div>
	);
};

export default OpponentTileRack;

