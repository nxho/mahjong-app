import React, { Component } from 'react';
import Player from './Player';

import { connect } from 'react-redux';
import {
	initTiles,
	initPlayers,
} from '../actions';

class Mahjong extends Component {
	async componentDidMount() {
		// this.props.dealTilesToPlayers(this.props.tiles);
		this.dealTilesToPlayers();
	}

	dealTilesToPlayers() {
		const currentPlayerState = this.props.players;
		const currentTileState = this.props.tiles;
		let currentTileIndex = this.props.tiles.length - 1;
		for (let player of currentPlayerState) {
			for (let i = 0; i < 14; i++) {
				const randIndex = Math.floor((Math.random() * 1000) % (currentTileIndex + 1));
				if (randIndex !== currentTileIndex) {
					const temp = currentTileState[currentTileIndex];
					currentTileState[currentTileIndex] = currentTileState[randIndex];
					currentTileState[randIndex] = temp;
				}
				player.tiles.push(currentTileState.pop());
				currentTileIndex--;
			}
		}

		this.setState({
			players: currentPlayerState,
			tiles: currentTileState,
		});
	}

	renderPlayer(id) {
		const player = this.props.players[id];
		return <Player
			id={id}
			name={player.name}
			tiles={player.tiles}
			tileRotation={player.tileRotation}
			direction={player.direction}
		/>;
	}

	render() {
		return (
			<div>
				{
					this.props.players.length > 0 && (
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
							<div>
								{ this.renderPlayer(2) }
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
								{ this.renderPlayer(3) }
								{ this.renderPlayer(0) }
							</div>
							<div>
								{ this.renderPlayer(1) }
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	tiles: state.tiles,
	players: state.players,
});

const mapDispatchToProps = dispatch => ({
	initTiles: () => dispatch(initTiles()),
	initPlayers: () => dispatch(initPlayers()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Mahjong);

