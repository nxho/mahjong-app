import React from 'react';
import PlayerTile from './PlayerTile';
import './TileRack.css';

const TileRack = function({ tiles }) {
	return (
		<div className={'player-tile-rack player-tile-rack-row'}>
			{
				tiles.map((item, index) => (
					<PlayerTile
						key={item.key}
						index={index}
						tileSuit={item.suit}
						tileType={item.type}
					/>
				))
			}
		</div>
	);
}

export default TileRack;

