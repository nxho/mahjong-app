import React from 'react';
import { OpponentTileRack } from './OpponentTileRack';

import './Opponent.css';
import { Opponent as OpponentType } from '../reducers/opponents';

type Props = OpponentType & {
	position: string;
};

export const Opponent = ({
	name,
	revealedMelds,
	concealedKongs,
	tileCount,
	isCurrentTurn,
	position,
}: Props) => {
	console.log(
		`Rendering <Opponent /> name=${name} with melds=${JSON.stringify(
			revealedMelds,
		)}`,
	);
	return (
		<div className={`div__opponent div__opponent-${position}`}>
			<OpponentTileRack
				revealedMelds={revealedMelds}
				concealedKongs={concealedKongs}
				position={position}
				tileCount={tileCount}
				isCurrentTurn={isCurrentTurn}
			/>
			<h3 className={`h3__opponent-name h3__opponent-name-${position}`}>
				{name}
			</h3>
		</div>
	);
};
