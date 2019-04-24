import React, { Component } from 'react';
import Board from './Board';
import Chatroom from './Chatroom';
import UsernameForm from './UsernameForm';

class Mahjong extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isUsernameFormVisible: true,
		}
	}

	// TODO: initialize socketio event listeners here?? or in index.js vis store.dispatch()?
	componentDidMount() {
	}

	hideForm = () => {
		this.setState({
			isUsernameFormVisible: false,
		});
	}

	renderUsernameForm() {
		return (
			<UsernameForm onSubmit={this.hideForm}/>
		);
	}

	renderGame() {
		return (
			<div style={
				{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					flex: 1,
				}
			}>
				<Board />
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

export default Mahjong;

