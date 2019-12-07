import React from 'react';
import { connect } from 'react-redux';
import TileRack from './TileRack';
import MeldsContainer from './MeldsContainer';
import { drawTile, endTurn, claimTile } from '../actions';

const Player = ({username, tiles, isCurrentTurn, endTurn, selectedTileIndex, currentState, drawTile, claimTile}) => {
	const renderButton = () => {
		switch (currentState) {
			case 'DRAW_TILE':
				return <button onClick={() => drawTile()}>Draw Tile</button>;
			case 'DISCARD_TILE':
				const handleClick = () => {
					console.log(`Dispatching END_TURN for selectedTileIndex=${selectedTileIndex}`);
					if (selectedTileIndex != null) {
						endTurn(tiles[selectedTileIndex]);
					}
				};
				return <button onClick={handleClick}>Discard Tile</button>;
			default:
		}
		return null;
	};

	const renderDeclareButtons = () => {
		if (currentState === 'DECLARE_CLAIM') {
			return (
				<div>
					<label>Claim discard with </label>
					<button onClick={() => claimTile('WIN')}>Win</button>
					<button onClick={() => claimTile('PONG')}>Pong</button>
					<button onClick={() => claimTile('KONG')}>Kong</button>
					<button onClick={() => claimTile('CHOW')}>Chow</button>
				</div>
			);
		}
		return null;
	};

	let justifyContent = 'space-between';
	if (currentState === 'DECLARE_CLAIM') {
		justifyContent = 'flex-end';
	}

	const renderActionRow = () => (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent,
		}}>
			{renderButton()}
			{renderDeclareButtons()}
		</div>
	);

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
		}}>
			<MeldsContainer />
			<h3>{username}{isCurrentTurn ? ' - | YOUR TURN |' : ''}</h3>
			{renderActionRow()}
			<TileRack tiles={tiles} />
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	claimTile: (claimType) => dispatch(claimTile(claimType)),
	endTurn: (discardedTile) => dispatch(endTurn(discardedTile)),
	drawTile: () => dispatch(drawTile()),
});

export default connect(
	null,
	mapDispatchToProps,
)(Player);

