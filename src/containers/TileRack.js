import React from 'react';
import { connect } from 'react-redux';
import PlayerTile from './PlayerTile';
import './TileRack.css';

const TileRack = function({ tiles }) {
	return (
		<div className={'player-tile-rack player-tile-rack-row'}>
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
	validMeldSubsets: state.player.validMeldSubsets,
});

export default connect(
	mapStateToProps,
	null,
)(TileRack);

