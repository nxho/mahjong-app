import React from 'react';
import TileRack from './TileRack';

const Player = ({name, tiles, direction, tileRotation, isCurrentTurn}) => (
	<div>
		<h3>{name}{isCurrentTurn ? ' - | YOUR TURN |' : ''}</h3>
		<TileRack
			tiles={tiles}
			direction={direction}
			tileRotation={tileRotation}
			tileDragEnabled={isCurrentTurn}
		/>
	</div>
);

export default Player;

