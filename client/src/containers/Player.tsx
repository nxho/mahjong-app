import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerTileRack } from './PlayerTileRack';
import { PlayerMeldsContainer } from './PlayerMeldsContainer';
import {
	drawTile,
	endTurn,
	claimTile,
	declareWin,
	declareKong,
} from '../actions';

import './Player.css';
import { MahjongState } from '../reducers';

export const Player = () => {
	const {
		username,
		selectedTileIndex,
		currentState,
		canDeclareWin,
		canDeclareKong,
	} = useSelector(({ player }: MahjongState) => player);
	const dispatch = useDispatch();

	const handleClickDiscard = () => {
		if (selectedTileIndex != null) {
			console.log(
				`Dispatching END_TURN for selectedTileIndex=${selectedTileIndex}`,
			);
			dispatch(endTurn());
		}
	};

	const renderCurrentTurnButtons = () => {
		let buttonEl = null;
		switch (currentState) {
			case 'DRAW_TILE':
				buttonEl = (
					<button
						className="player-action-button"
						onClick={() => dispatch(drawTile())}
					>
						Draw Tile
					</button>
				);
				break;
			case 'DISCARD_TILE':
				buttonEl = (
					<>
						<button
							className="player-action-button"
							onClick={handleClickDiscard}
						>
							Discard Tile
						</button>
						{canDeclareWin && (
							<button
								className="player-action-button"
								onClick={() => dispatch(declareWin())}
							>
								Declare Win
							</button>
						)}
						{canDeclareKong && (
							<button
								className="player-action-button"
								onClick={() => dispatch(declareKong())}
							>
								Declare Kong
							</button>
						)}
					</>
				);
				break;
			default:
		}

		return <div className="player-current-row">{buttonEl}</div>;
	};

	const isDisabled = currentState !== 'DECLARE_CLAIM';
	const renderDeclareButtons = () => {
		let buttonClass = 'player-action-button';
		if (isDisabled) {
			buttonClass += ' player-declare-button--state-disabled';
		}
		return (
			<div className="player-declare-row">
				<button
					className={buttonClass}
					disabled={isDisabled}
					onClick={() => dispatch(claimTile('WIN'))}
				>
					Win
				</button>
				<button
					className={buttonClass}
					disabled={isDisabled}
					onClick={() => dispatch(claimTile('PUNG'))}
				>
					Pung
				</button>
				<button
					className={buttonClass}
					disabled={isDisabled}
					onClick={() => dispatch(claimTile('KONG'))}
				>
					Kong
				</button>
				<button
					className={buttonClass}
					disabled={isDisabled}
					onClick={() => dispatch(claimTile('CHOW'))}
				>
					Chow
				</button>
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
		<div className="div__player-container">
			<PlayerMeldsContainer />
			<div className="div__player-header-row">
				<h3 className={'h3__player-name'}>{username}</h3>
				<h4 className={h4ClassName}>Claim discard with </h4>
			</div>
			{renderActionRow()}
			<PlayerTileRack />
		</div>
	);
};
