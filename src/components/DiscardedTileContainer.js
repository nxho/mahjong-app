import React from 'react';
import Tile from './Tile';

import './DiscardedTileContainer.css';

const DiscardedTileContainer = ({ tileProps }) => (
	<div className='discarded-tile-container'>
		<p>Last Discarded Tile</p>
		{
			tileProps &&
				<div className='discarded-tile-container__tile'>
					<Tile
						suit={tileProps.suit}
						type={tileProps.type}
					/>
				</div>
		}
	</div>
);

export default DiscardedTileContainer;

