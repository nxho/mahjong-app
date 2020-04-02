import React from 'react';
import Tile from './Tile';

import './DiscardedTileContainer.css';

const DiscardedTileContainer = ({ discardedTile, pastDiscardedTiles }) => (
	<div className='discarded-tile-container'>
		{ !!pastDiscardedTiles && pastDiscardedTiles.map((tile, index) => (
			<div className='discarded-tile-container__tile' key={index}>
				<Tile
					suit={tile.suit}
					type={tile.type}
				/>
			</div>
		))
		}
		{ !!discardedTile &&
			<div className='discarded-tile-container__tile'>
				<Tile
					suit={discardedTile.suit}
					type={discardedTile.type}
				/>
			</div>
		}
	</div>
);

export default DiscardedTileContainer;

