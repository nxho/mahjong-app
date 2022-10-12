import React from 'react';
import { useSelector } from 'react-redux';
import { MahjongState } from '../reducers';
import { PlayerTile } from './PlayerTile';
import './PlayerTileRack.css';

export const PlayerTileRack = () => {
	const { tiles, isCurrentTurn } = useSelector(
		({ player }: MahjongState) => player,
	);

	let playerTileRackClassName = 'player-tile-rack';
	if (!isCurrentTurn) {
		playerTileRackClassName += ' player-tile-rack--appear-disabled';
	}
	return (
		<div className={playerTileRackClassName}>
			{tiles.map(({ key, suit, type, meldable }, index) => (
				<PlayerTile
					key={key}
					index={index}
					tileSuit={suit}
					tileType={type}
					meldable={meldable}
				/>
			))}
		</div>
	);
};
