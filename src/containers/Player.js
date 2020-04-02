import React from 'react';
import { connect } from 'react-redux';
import PlayerTileRack from './PlayerTileRack';
import PlayerMeldsContainer from './PlayerMeldsContainer';
import { drawTile, endTurn, claimTile, declareWin, declareKong } from '../actions';

import './Player.css';

const Player = ({ username, selectedTileIndex, currentState, canDeclareWin, canDeclareKong, discardTile, drawTile, claimTile, declareWin, declareKong }) => {
	const renderCurrentTurnButtons = () => {
		let buttonEl = null;
		switch (currentState) {
			case 'DRAW_TILE':
				buttonEl = <button className='player-action-button' onClick={drawTile}>Draw Tile</button>;
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
						<button className='player-action-button' onClick={handleClick}>Discard Tile</button>
						{ canDeclareWin && <button className='player-action-button' onClick={declareWin}>Declare Win</button> }
						{ canDeclareKong && <button className='player-action-button' onClick={declareKong}>Declare Kong</button> }
					</>
				);
				break;
			default:
		}

		return <div className='player-current-row'>{buttonEl}</div>;
	};

	const isDisabled = currentState !== 'DECLARE_CLAIM';
	const renderDeclareButtons = () => {
		let buttonClass = 'player-action-button';
		if (isDisabled) {
			buttonClass += ' player-declare-button--state-disabled';
		}
		return (
			<div className='player-declare-row'>
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

	let h4ClassName = 'h4__claim-discard';
	if (isDisabled) {
		h4ClassName += ' h4__claim-discard--state-disabled';
	}

	return (
		<div className='div__player-container'>
			<PlayerMeldsContainer />
			<div className='div__player-header-row'>
				<h3 className={'h3__player-name'}>{username}</h3>
				<h4 className={h4ClassName}>Claim discard with </h4>
			</div>
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
	canDeclareKong: state.player.canDeclareKong,
});

const mapDispatchToProps = dispatch => ({
	claimTile: (claimType) => dispatch(claimTile(claimType)),
	declareKong: () => dispatch(declareKong()),
	declareWin: () => dispatch(declareWin()),
	discardTile: () => dispatch(endTurn()),
	drawTile: () => dispatch(drawTile()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Player);

