import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Opponent from '../components/Opponent';

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

	render() {
		return (
			<div className='boardContainer' data-testid='board'>
				<div className='leftColumn'>
					{ this.renderOpponent(2) }
				</div>
				<div className='middleColumn'>
					{ this.renderOpponent(1) }
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
	tiles: state.tiles,
	player: state.player,
	opponents: state.opponents,
});

export default connect(
	mapStateToProps,
	null,
)(Board);

