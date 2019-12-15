import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Opponent from '../components/Opponent';
import DiscardedTileContainer from '../components/DiscardedTileContainer';

import './Board.css';

class Board extends Component {
	renderPlayer() {
		const player = this.props.player;
		return <Player
			username={player.username}
			tiles={player.tiles}
			tileRotation={0}
			selectedTileIndex={player.selectedTileIndex}
			currentState={player.currentState}
		/>;
	}

	renderOpponent(id, position) {
		const opponent = this.props.opponents[id];
		return <Opponent
			name={opponent.name}
			melds={opponent.revealedMelds}
			tileCount={opponent.tileCount}
			position={position}
		/>;
	}

	renderDiscardedTile() {
		// TODO: should discardedTile be here?? or in a different slice of state?
		const discardedTile = this.props.player.discardedTile;
		return <DiscardedTileContainer
			tileProps={discardedTile}
		/>;
	}

	render() {
		return (
			<div className='boardContainer' data-testid='board'>
				<div className='leftColumn'>
					{ this.renderOpponent(2, 'left') }
				</div>
				<div className='middleColumn'>
					{ this.renderOpponent(1, 'top') }
					{ this.renderDiscardedTile() }
					{ this.renderPlayer() }
				</div>
				<div className='rightColumn'>
					{ this.renderOpponent(0, 'right') }
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	player: state.player,
	opponents: state.opponents,
});

export default connect(
	mapStateToProps,
	null,
)(Board);

