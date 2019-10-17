import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Opponent from '../components/Opponent';
import DiscardedTileContainer from './DiscardedTileContainer';

import './Board.css';

class Board extends Component {
	renderPlayer() {
		const player = this.props.player;
		return <Player
			name={player.name}
			tiles={player.tiles}
			tileRotation={0}
			direction={'row'}
			isCurrentTurn={player.isCurrentTurn}
		/>;
	}

	renderOpponent(id) {
		const opponent = this.props.opponents[id];
		const direction = id % 2 === 0 ? 'column' : 'row';
		return <Opponent
			name={opponent.name}
			direction={direction}
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
					{ this.renderOpponent(2) }
				</div>
				<div className='middleColumn'>
					{ this.renderOpponent(1) }
					{ this.renderDiscardedTile() }
					{ this.renderPlayer() }
				</div>
				<div className='rightColumn'>
					{ this.renderOpponent(0) }
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

