import React from 'react';
import { connect } from 'react-redux';
import TileRack from './TileRack';
import { drawTile, endTurn } from '../actions';

const Player = ({username, tiles, direction, tileRotation, isCurrentTurn, endTurn, selectedTileIndex, currentState, drawTile}) => {
	const renderButton = () => {
		// TODO: need to decide whether to use isCurrentTurn or currentState
		// currently keeping isCurrentTurn for possible client side disabling of button, so we don't have wait for a server update of currentState, but it might be a non-issue
		if (isCurrentTurn) {
			switch (currentState) {
				case 'DRAW_TILE':
					return <button onClick={() => drawTile()}>Draw Tile</button>;
				case 'DISCARD_TILE':
					return <button onClick={() => endTurn(tiles[selectedTileIndex])}>End Turn</button>;
				default:
			}
		}
		return null;
	};

	return (
		<div>
			<h3>{username}{isCurrentTurn ? ' - | YOUR TURN |' : ''}</h3>
			{renderButton()}
			<TileRack
				tiles={tiles}
				direction={direction}
				tileRotation={tileRotation}
				tileDragEnabled={isCurrentTurn}
			/>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	endTurn: (discardedTile) => dispatch(endTurn(discardedTile)),
	drawTile: () => dispatch(drawTile()),
});

export default connect(
	null,
	mapDispatchToProps,
)(Player);

