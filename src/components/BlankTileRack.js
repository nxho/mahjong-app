import React from 'react';
import BlankTile from './BlankTile';
import './BlankTileRack.css';

const BlankTileRack = ({ revealedMelds, tileCount, position }) => {
	let tiles = [];
	for (let i = 0; i < tileCount; i++) {
		tiles.push(
			<BlankTile
				key={i}
				position={position}
			/>
		);
	}
	return (
		<div className={`blank-tile-rack blank-${position}`}>
			{tiles}
		</div>
	);
};

export default BlankTileRack;

