import React from 'react';
import Tile from './Tile';

import './DiscardedTileContainer.css';

const DiscardedTileContainer = ({ discardedTile, pastDiscardedTiles }) => (
	<div className='discarded-tile-container'>
		{ !!pastDiscardedTiles && discardedTile && pastDiscardedTiles.concat([discardedTile]).map((tile, index) => (
				<div className='discarded-tile-container__tile'>
					<Tile
						suit={tile.suit}
						type={tile.type}
					/>
				</div>
			))
		}
	</div>
);

export default DiscardedTileContainer;

