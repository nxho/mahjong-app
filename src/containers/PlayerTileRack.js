import React from 'react';
import { connect } from 'react-redux';
import PlayerTile from './PlayerTile';
import './PlayerTileRack.css';

const PlayerTileRack = function({ tiles }) {
	return (
		<div className='player-tile-rack'>
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
)(PlayerTileRack);

