import React from 'react';
import { connect } from 'react-redux';
import TileRack from './TileRack';
import { endTurn } from '../actions';

const Player = ({name, tiles, direction, tileRotation, isCurrentTurn, endTurn}) => (
	<div>
		<h3>{name}{isCurrentTurn ? ' - | YOUR TURN |' : ''}</h3>
		{isCurrentTurn &&
			<button onClick={endTurn}>End Turn</button>
		}
		<TileRack
			tiles={tiles}
			direction={direction}
			tileRotation={tileRotation}
			tileDragEnabled={isCurrentTurn}
		/>
	</div>
);

const mapDispatchToProps = dispatch => ({
	endTurn: () => dispatch(endTurn()),
});

export default connect(
	null,
	mapDispatchToProps,
)(Player);

