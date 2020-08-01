import React from 'react';
import { leaveGame } from '../actions';
import { connect } from 'react-redux';

import './Overlay.css';

const Overlay = ({ currentState, leaveGame }) => {
	const text = 'YOU ' + (currentState === 'WIN' ? 'WIN' : 'LOSE >:)');

	return (
		<div className='overlay'>
			<h1 className='overlay__heading'>{text}</h1>
			<button className='overlay__button' onClick={leaveGame}>Quit Game</button>
		</div>
	);
};

const mapStateToProps = state => ({
	currentState: state.player.currentState,
});

const mapDispatchToProps = dispatch => ({
	leaveGame: () => dispatch(leaveGame()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Overlay);
