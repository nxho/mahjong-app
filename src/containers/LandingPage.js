import React, {
	useState
} from 'react';
import { connect } from 'react-redux';

import UsernameForm from './UsernameForm';
import './LandingPage.css';

function LandingPage({ onSubmit }) {
	const [isUsernameFormVisible, setUsernameFormVisible] = useState(false);
	const [isRoomFormVisible, setRoomFormVisible] = useState(false);

	const createGame = (e) => {
		setUsernameFormVisible(true);
	};

	const joinRandomGame = (e) => {
	};

	const joinRoomId = (e) => {
	};

	if (isUsernameFormVisible) {
		return <UsernameForm onBack={() => setUsernameFormVisible(false)} />
	}

	if (isRoomFormVisible) {
	}

	return (
		<div className='landing-page'>
			<button className='create-btn' type="button" onClick={createGame}>Create New Game</button>
			<button className='random-btn' type="button" onClick={joinRandomGame}>Join Random Game</button>
			<button className='join-btn' type="button" onClick={joinRoomId}>Join Game with Room ID</button>
		</div>
	);
}


export default connect(
	null,
	null,
)(LandingPage);

