import React from 'react';
import { connect } from 'react-redux';
import TileRack from './TileRack';
import MeldsContainer from './MeldsContainer';
import { drawTile, endTurn, claimTile } from '../actions';

import './Player.css';

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
		return <div></div>;
	};

	const renderDeclareButtons = () => {
		const isDisabled = currentState !== 'DECLARE_CLAIM';
		let buttonClass = '';
		if (isDisabled) {
			buttonClass = 'player-declare-button--state-disabled';
		}
		return (
			<div className='player-declare-row'>
				<label>Claim discard with </label>
				<button className={buttonClass} disabled={isDisabled} onClick={() => claimTile('WIN')}>Win</button>
				<button className={buttonClass} disabled={isDisabled} onClick={() => claimTile('PONG')}>Pong</button>
				<button className={buttonClass} disabled={isDisabled} onClick={() => claimTile('KONG')}>Kong</button>
				<button className={buttonClass} disabled={isDisabled} onClick={() => claimTile('CHOW')}>Chow</button>
			</div>
		);
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

