import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOpponents, updateTiles, startTurn } from '../actions';

import Board from './Board';
import Chatroom from './Chatroom';
import UsernameForm from './UsernameForm';
import WaitingRoom from '../components/WaitingRoom';

const containerStyle = {
	display: 'flex',
	flexDirection: 'row',
	flex: 1,
	height: window.innerHeight,
};

class Mahjong extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isUsernameFormVisible: true,
		}
	}

	// TODO: initialize socketio event listeners here?? or in index.js via store.dispatch()?
	componentDidMount() {
		this.props.socket.on('update_opponents', (opponents) => {
			console.log('Received "update_opponents" event from server, updating opponents to:', opponents);
			this.props.updateOpponents(opponents);
		});
		this.props.socket.on('update_tiles', (tiles) => {
			console.log('Received "update_tiles" event from server, updating tiles to:', tiles);
			this.props.updateTiles(tiles);
		});
		this.props.socket.on('start_turn', () => {
			console.log('Received "start_turn" event from server, enabling tile movement for player');
			this.props.startTurn();
		});
	}

	hideForm = () => {
		this.setState({
			isUsernameFormVisible: false,
		});
	}

	isEnoughPlayers() {
		return this.props.opponents.length >= 3;
	}

	renderUsernameForm() {
		return (
			<div style={containerStyle}>
				<UsernameForm onSubmit={this.hideForm}/>
			</div>
		);
	}

	renderGame() {
		return (
			<div style={containerStyle}>
				{
					(this.isEnoughPlayers() && <Board />) || <WaitingRoom />
				}
				<Chatroom />
			</div>
		);
	}

	render() {
		if (this.state.isUsernameFormVisible) {
			return this.renderUsernameForm();
		}

		return this.renderGame();
	}
}

const mapStateToProps = state => ({
	opponents: state.opponents,
	socket: state.socket,
});

const mapDispatchToProps = dispatch => ({
	updateOpponents: (opponents) => dispatch(updateOpponents(opponents)),
	updateTiles: (tiles) => dispatch(updateTiles(tiles)),
	startTurn: () => dispatch(startTurn()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Mahjong);

