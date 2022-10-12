import React from 'react';
import { useSelector } from 'react-redux';
import { Player } from './Player';
import { Opponent } from '../components/Opponent';
import { DiscardedTileContainer } from '../components/DiscardedTileContainer';
import { Overlay } from './Overlay';
import { MahjongState } from '../reducers';

import './Board.css';

export const Board = () => {
	const {
		discardedTile,
		pastDiscardedTiles,
		isGameOver,
		opponents,
	} = useSelector(({ player, opponents }: MahjongState) => ({
		discardedTile: player.discardedTile,
		pastDiscardedTiles: player.pastDiscardedTiles,
		isGameOver: player.isGameOver,
		opponents,
	}));

	const renderOpponent = (id: number, position: 'top' | 'left' | 'right') => {
		const {
			name,
			revealedMelds,
			concealedKongs,
			tileCount,
			isCurrentTurn,
		} = opponents[id];
		return (
			<Opponent
				name={name}
				revealedMelds={revealedMelds}
				concealedKongs={concealedKongs}
				tileCount={tileCount}
				position={position}
				isCurrentTurn={isCurrentTurn}
			/>
		);
	};

	console.log('Re-rendering Board container');

	return (
		<div className="boardContainer" data-testid="board">
			<div className="leftColumn">{renderOpponent(2, 'left')}</div>
			<div className="middleColumn">
				{renderOpponent(1, 'top')}
				<DiscardedTileContainer
					discardedTile={discardedTile}
					pastDiscardedTiles={pastDiscardedTiles}
				/>
				<Player />
			</div>
			<div className="rightColumn">{renderOpponent(0, 'right')}</div>
			{isGameOver && <Overlay />}
		</div>
	);
};
