import React, { useEffect, useRef } from 'react';
import { leaveGame } from '../actions';
import { connect } from 'react-redux';

import WilhelmScream from '../WilhelmScream.flac';

import './Overlay.css';

const Overlay = ({ currentState, leaveGame }) => {
	let audioRef = useRef(null);
	const text = 'YOU ' + (currentState === 'WIN' ? 'WIN' : 'LOSE >:)');

	useEffect(() => {
		if (!!audioRef.current) {
			audioRef.current.volume = 0.1;
		}
	});

	return (
		<div className='overlay'>
			<h1 className='overlay__heading'>{text}</h1>
			<button className='overlay__button' onClick={leaveGame}>Quit Game</button>
			<audio muted={true} ref={audioRef} autoPlay={currentState === 'LOSS'}>
				<source src={WilhelmScream} type='audio/flac' />
			</audio>
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
