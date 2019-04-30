import React from 'react';
import BlankTile from './BlankTile';
import './BlankTileRack.css';

const BlankTileRack = ({direction}) => {
	let tiles = [];
	for (let i = 0; i < 14; i++) {
		tiles.push(
			<BlankTile
				key={i}
				direction={direction}
			/>
		);
	}
	console.log('opponent tiles', tiles);
	return (
		<div className={'tileRackDiv ' + direction}>
			{tiles}
		</div>
	);
};

export default BlankTileRack;

