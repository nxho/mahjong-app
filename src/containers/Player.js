import React from 'react';
import TileRack from './TileRack';

const Player = ({name, id, tiles, direction, tileRotation}) => (
	<div>
		<h3>{name}</h3>
		<TileRack
			playerId={id}
			tiles={tiles}
			direction={direction}
			tileRotation={tileRotation}
		/>
	</div>
);

export default Player;

