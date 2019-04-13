import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dealTilesToPlayers } from '../actions';
import Player from './Player';

import io from 'socket.io-client';

class Mahjong extends Component {
	constructor(props) {
		super(props);

		this.socket = io('http://localhost:5000', {transports: ['websocket']});
	}

	componentDidMount() {
		this.socket.on('message', (message) => {
			console.log("message:", message);
		});

		this.socket.emit('message', 'test message');

		this.props.dealTilesToPlayers(this.props.players.allIds);
	}

	renderPlayer(id) {
		const player = this.props.players.byId[id];
		return <Player
			id={id}
			name={player.name}
			tiles={this.props.tiles.byId[id]}
			tileRotation={player.tileRotation}
			direction={player.direction}
		/>;
	}

	render() {
		return (
			<div>
				{
					Object.keys(this.props.players.byId).length > 0 && (
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
							<div>
								{ this.renderPlayer('3') }
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
								{ this.renderPlayer('4') }
								{ this.renderPlayer('1') }
							</div>
							<div>
								{ this.renderPlayer('2') }
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
	dealTilesToPlayers: (playerIds) => dispatch(dealTilesToPlayers(playerIds)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Mahjong);

