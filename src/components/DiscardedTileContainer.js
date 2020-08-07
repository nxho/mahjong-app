import React from 'react';
import Tile from './Tile';
import { v4 as uuidv4 } from 'uuid';

import './DiscardedTileContainer.css';

const DiscardedTileContainer = ({ discardedTile, pastDiscardedTiles }) => (
	<div className='discarded-tile-container'>
		{ !!pastDiscardedTiles && pastDiscardedTiles.map((tile, index) => (
			<div className='discarded-tile-container__tile' key={uuidv4()}>
				<Tile
					suit={tile.suit}
					type={tile.type}
				/>
			</div>
		))
		}
		{ !!discardedTile &&
			<div className='discarded-tile-container__tile' key={uuidv4()}>
				<Tile
					suit={discardedTile.suit}
					type={discardedTile.type}
				/>
			</div>
		}
	</div>
);

export default DiscardedTileContainer;

