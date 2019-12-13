import React from 'react';
import BlankTileRack from './BlankTileRack';

import './Opponent.css';

const Opponent = ({ name, tileCount, position}) => (
	<div className={`div__opponent div__opponent-${position}`}>
		<BlankTileRack
			position={position}
			tileCount={tileCount}
		/>
		<h3 className={`h3__opponent-name-${position}`}>{name}</h3>
	</div>
);

export default Opponent;

