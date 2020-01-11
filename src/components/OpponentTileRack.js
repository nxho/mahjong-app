import React from 'react';
import HiddenTile from './HiddenTile';
import Melds from './Melds';

import './OpponentTileRack.css';

const OpponentTileRack = ({ revealedMelds, concealedKongs, tileCount, position, isCurrentTurn }) => {
	let opponentTileRackClassName = `opponent-tile-rack opponent-tile-rack-${position}`;
	if (!isCurrentTurn) {
		opponentTileRackClassName += ' opponent-tile-rack--half-opacity';
	}

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
		<div className={opponentTileRackClassName}>
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

