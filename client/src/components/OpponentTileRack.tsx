import React from 'react';
import { Opponent } from '../reducers/opponents';
import { HiddenTile } from './HiddenTile';
import { Melds } from './Melds';

import './OpponentTileRack.css';

type Props = Omit<Opponent, 'name'> & {
	position: string;
};

export const OpponentTileRack = ({
	revealedMelds,
	concealedKongs,
	tileCount,
	position,
	isCurrentTurn,
}: Props) => {
	let opponentTileRackClassName = `opponent-tile-rack opponent-tile-rack-${position}`;
	if (!isCurrentTurn) {
		opponentTileRackClassName += ' opponent-tile-rack--half-opacity';
	}

	const tiles = [];
	for (let i = 0; i < tileCount; i++) {
		tiles.push(<HiddenTile key={i} position={position} />);
	}

	return (
		<div className={opponentTileRackClassName}>
			{tiles}
			{
				<Melds
					melds={revealedMelds}
					concealedKongs={concealedKongs}
					position={position}
				/>
			}
		</div>
	);
};
