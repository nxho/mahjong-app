import React from 'react';
import BlankTileRack from './BlankTileRack';

const Opponent = ({name, direction}) => (
	<div>
		<h3>{name}</h3>
		<BlankTileRack
			direction={direction}
		/>
	</div>
);

export default Opponent;

