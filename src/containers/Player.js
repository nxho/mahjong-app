import React from 'react';
import { connect } from 'react-redux';
import PlayerTileRack from './PlayerTileRack';
import MeldsContainer from './MeldsContainer';
import { drawTile, endTurn, claimTile, declareWin } from '../actions';

import './Player.css';

const Player = ({ username, selectedTileIndex, currentState, canDeclareWin, discardTile, drawTile, claimTile, declareWin }) => {
	const renderCurrentTurnButtons = () => {
		let buttonEl = null;
		switch (currentState) {
			case 'DRAW_TILE':
				buttonEl = <button onClick={drawTile}>Draw Tile</button>;
				break;
			case 'DISCARD_TILE':
				const handleClick = () => {
					if (selectedTileIndex != null) {
						console.log(`Dispatching END_TURN for selectedTileIndex=${selectedTileIndex}`);
						discardTile();
					}
				};
				buttonEl = (
					<>
						<button onClick={handleClick}>Discard Tile</button>
						{ canDeclareWin && <button onClick={declareWin}>Declare Win</button> }
					</>
				);
				break;
			default:
		}

		return <div className='player-current-row'>{buttonEl}</div>;
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
				<button className={buttonClass} disabled={isDisabled} onClick={() => claimTile('PUNG')}>Pung</button>
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
			<PlayerTileRack />
		</div>
	);
};

const mapStateToProps = state => ({
	username: state.player.username,
	selectedTileIndex: state.player.selectedTileIndex,
	currentState: state.player.currentState,
	canDeclareWin: state.player.canDeclareWin,
});

const mapDispatchToProps = dispatch => ({
	claimTile: (claimType) => dispatch(claimTile(claimType)),
	declareWin: () => dispatch(declareWin()),
	discardTile: () => dispatch(endTurn()),
	drawTile: () => dispatch(drawTile()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Player);

