import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import Chatroom from './Chatroom';
import LandingPage from './LandingPage';
import WaitingRoom from '../components/WaitingRoom';

import './Mahjong.css';

function Mahjong({ opponents, player }) {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	console.log('Re-rendering Mahjong container')

	const debounce = (fn, time) => {
		let timeout;

		return function() {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn.apply(this, arguments), time);
		};
	};
	const updateWidthAndHeight = () => {
		console.log(`Resized: new width=${window.innerWidth} height=${window.innerHeight}`);

		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", debounce(updateWidthAndHeight, 1000));
		return () => window.removeEventListener("resize", debounce(updateWidthAndHeight));
	});

	const isEnoughPlayers = () => {
		return opponents.length >= 3;
	};

	const containerStyle = {
		height: window.innerHeight,
	};

	if (!player.inGame) {
		return (
			<div className='mahjong-container' style={containerStyle}>
				<LandingPage />
			</div>
		);
	}

	return (
		<div className='mahjong-container' style={containerStyle}>
			{
				(isEnoughPlayers() && <Board />) || <WaitingRoom />
			}
			<Chatroom />
		</div>
	);
}

const mapStateToProps = state => ({
	opponents: state.opponents,
	player: state.player,
});

export default connect(
	mapStateToProps,
	null,
)(Mahjong);

