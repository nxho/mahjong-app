import React, {
	useState,
} from 'react';
import { connect } from 'react-redux';

import { joinGame } from '../actions';
import LandingPageForm from './LandingPageForm';
import './LandingPage.css';

function LandingPage({ onSubmit, joinGame }) {
	console.log('rendering landing page');
	const [isFormVisible, setFormVisible] = useState(false);
	const [isRoomInputVisible, setRoomInputVisible] = useState(false);
	const [shouldCreateRoom, setShouldCreateRoom] = useState(false);

	const hideForm = () => {
		setFormVisible(false);
		setRoomInputVisible(false);
		setShouldCreateRoom(false);
	};

	const showForm = () => {
		setFormVisible(true);
	};

	const showCreateGameForm = (e) => {
		setShouldCreateRoom(true);
		showForm();
	};

	const showJoinGameForm = (e) => {
		setShouldCreateRoom(false);
		setRoomInputVisible(true);
		showForm();
	};

	const handleSubmit = (username, roomId) => {
		console.log(`handleSubmit called, need to submit username=${username} and roomId=${roomId}`);
		joinGame(username, roomId, shouldCreateRoom);
	};

	const getInnerComponent = () => {
		if (isFormVisible) {
			return (
				<LandingPageForm onHide={hideForm} onSubmit={handleSubmit} showRoomIdInput={isRoomInputVisible} />
			);
		}

		return (
			<>
				<button className='landing-page-btn landing-page__create-btn' type="button" onClick={showCreateGameForm}>Host a New Game</button>
				<button className='landing-page-btn landing-page__join-btn' type="button" onClick={showJoinGameForm}>Join a Game</button>
			</>
		);
	}

	return (
		<div className='landing-page'>
			{ getInnerComponent() }
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	joinGame: (username, roomId, shouldCreateRoom) => dispatch(joinGame(username, roomId, shouldCreateRoom)),
});

export default connect(
	null,
	mapDispatchToProps,
)(LandingPage);

