import React from 'react';
import { connect } from 'react-redux';

import './WaitingRoom.css';

const HostOptions = ({ numOfOpponents }) => (
	<div>
		<button>Start Game</button>
		<p>Current opponent count: {numOfOpponents}</p>
	</div>
);

const WaitingRoom = ({ isHost, opponentsLength }) => (
	<div className='div__waiting-room' data-testid='waiting-room'>
		{ (!!isHost && <HostOptions numOfOpponents={opponentsLength} />) || <p>Waiting for host to start game...</p> }
	</div>
);

const mapStateToProps = state => ({
	opponentsLength: state.opponents.length,
	isHost: state.player.isHost,
});

export default connect(
	mapStateToProps,
	null,
)(WaitingRoom);

