import React from 'react';
import BlankTileRack from './BlankTileRack';

const Opponent = ({name, direction}) => (
	<div style={{
		display: 'flex',
		flexDirection: 'column',
	}}>
		<h3>{name}</h3>
		<BlankTileRack
			direction={direction}
		/>
	</div>
);

export default Opponent;

