import React from 'react';
import HiddenTile from './HiddenTile';
import Melds from './Melds';

import './OpponentTileRack.css';

const OpponentTileRack = ({ revealedMelds, concealedKongs, tileCount, position }) => {
	let tiles = [];
	for (let i = 0; i < tileCount; i++) {
		tiles.push(
			<HiddenTile
				key={i}
				position={position}
			/>
		);
	}

	return (
		<div className={`opponent-tile-rack opponent-tile-rack-${position}`}>
			{tiles}
			{
				<Melds
					melds={revealedMelds}
					concealedKongs={concealedKongs}
					position={position}
				/>
			}
		</div>
	);
};

export default OpponentTileRack;

