import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import Chatroom from './Chatroom';

class Mahjong extends Component {
	render() {
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
}

export default Mahjong;

