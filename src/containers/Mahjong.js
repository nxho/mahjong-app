import React, { Component } from 'react';
import Player from './Player';

import { connect } from 'react-redux';
import { dealTilesToPlayers } from '../actions';

class Mahjong extends Component {
	componentWillMount() {
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

