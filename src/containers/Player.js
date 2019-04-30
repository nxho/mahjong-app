import React from 'react';
import TileRack from './TileRack';

const Player = ({name, tiles, direction, tileRotation}) => (
	<div>
		<h3>{name}</h3>
		<TileRack
			tiles={tiles}
			direction={direction}
			tileRotation={tileRotation}
		/>
	</div>
);

export default Player;

