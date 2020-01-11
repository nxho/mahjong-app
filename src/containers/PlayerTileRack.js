import React from 'react';
import { connect } from 'react-redux';
import PlayerTile from './PlayerTile';
import './PlayerTileRack.css';

const PlayerTileRack = function({ tiles, isCurrentTurn }) {
	let playerTileRackClassName = 'player-tile-rack';
	if (!isCurrentTurn) {
		playerTileRackClassName += ' player-tile-rack--appear-disabled';
	}
	return (
		<div className={playerTileRackClassName}>
			{
				tiles.map(({ key, suit, type, meldable }, index) => (
					<PlayerTile
						key={key}
						index={index}
						tileSuit={suit}
						tileType={type}
						meldable={meldable}
					/>
				))
			}
		</div>
	);
}

const mapStateToProps = state => ({
	tiles: state.player.tiles,
	isCurrentTurn: state.player.isCurrentTurn,
});

export default connect(
	mapStateToProps,
	null,
)(PlayerTileRack);

