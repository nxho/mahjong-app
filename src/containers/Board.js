import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Opponent from '../components/Opponent';

class Board extends Component {

	componentDidMount() {
		// TODO: disable dealing tiles from JS temporarily, moving code to Python
		// this.props.dealTilesToPlayers(this.props.players.allIds);
	}

	renderPlayer() {
		const player = this.props.player;
		console.log('rendering player', player.tiles);
		return <Player
			id={0}
			name={player.name}
			tiles={player.tiles}
			tileRotation={0}
			direction={'row'}
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
			<div style={
				{
					display: 'flex',
					flex: 3,
					flexDirection: 'row',
					justifyContent: 'space-between'
				}
			}>
			<div>
				{ this.renderOpponent(2) }
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
				{ this.renderOpponent(1) }
				{ this.renderPlayer() }
			</div>
			<div>
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

