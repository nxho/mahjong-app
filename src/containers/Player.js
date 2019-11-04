import React from 'react';
import { connect } from 'react-redux';
import TileRack from './TileRack';
import { endTurn } from '../actions';

const Player = ({name, tiles, direction, tileRotation, isCurrentTurn, endTurn, selectedTileIndex}) => (
	<div>
		<h3>{name}{isCurrentTurn ? ' - | YOUR TURN |' : ''}</h3>
		{isCurrentTurn &&
			<button onClick={() => endTurn(tiles[selectedTileIndex])}>End Turn</button>
		}
		<TileRack
			tiles={tiles}
			direction={direction}
			tileRotation={tileRotation}
			tileDragEnabled={isCurrentTurn}
		/>
	</div>
);

const mapStateToProps = state => ({
	selectedTileIndex: state.player.selectedTileIndex,
});

const mapDispatchToProps = dispatch => ({
	endTurn: (discardedTile) => dispatch(endTurn(discardedTile)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Player);

