import React from 'react';
import { connect } from 'react-redux';
import TileRack from './TileRack';
import MeldsContainer from './MeldsContainer';
import { drawTile, endTurn, claimTile } from '../actions';

import './Player.css';

const Player = ({username, tiles, endTurn, selectedTileIndex, currentState, drawTile, claimTile}) => {
	const renderCurrentTurnButtons = () => {
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

	let className = 'div__player-action-row';
	if (currentState === 'DECLARE_CLAIM') {
		className += ' div__player-action-row--state-declare';
	}

	const renderActionRow = () => (
		<div className={className}>
			{renderCurrentTurnButtons()}
			{renderDeclareButtons()}
		</div>
	);

	return (
		<div className='div__player-container'>
			<MeldsContainer />
			<h3>{username}</h3>
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

