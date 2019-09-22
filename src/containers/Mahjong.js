import React, { Component } from 'react';
import { connect } from 'react-redux';

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
});

export default connect(
	mapStateToProps,
	null,
)(Mahjong);

