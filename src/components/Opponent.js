import React from 'react';
import OpponentTileRack from './OpponentTileRack';

import './Opponent.css';

const Opponent = ({ name, revealedMelds, concealedKongs, tileCount, position }) => {
	console.log(`Rendering <Opponent /> name=${name} with melds=${JSON.stringify(revealedMelds)}`);
		return (
			<div className={`div__opponent div__opponent-${position}`}>
				<OpponentTileRack
					revealedMelds={revealedMelds}
					concealedKongs={concealedKongs}
					position={position}
					tileCount={tileCount}
				/>
				<h3 className={`h3__opponent-name-${position}`}>{name}</h3>
			</div>
		);
};

export default Opponent;

