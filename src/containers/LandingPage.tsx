import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { joinGame } from '../actions';
import { LandingPageForm } from './LandingPageForm';
import './LandingPage.css';

export const LandingPage = () => {
	const dispatch = useDispatch();

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

	const showCreateGameForm = () => {
		setShouldCreateRoom(true);
		showForm();
	};

	const showJoinGameForm = () => {
		setShouldCreateRoom(false);
		setRoomInputVisible(true);
		showForm();
	};

	const handleSubmit = (username: string, roomId: string) => {
		console.log(
			`handleSubmit called, need to submit username=${username} and roomId=${roomId}`,
		);
		dispatch(joinGame(username, roomId, shouldCreateRoom));
	};

	const getInnerComponent = () => {
		if (isFormVisible) {
			return (
				<LandingPageForm
					onHide={hideForm}
					onSubmit={handleSubmit}
					showRoomIdInput={isRoomInputVisible}
				/>
			);
		}

		return (
			<>
				<button
					className="landing-page-btn landing-page__create-btn"
					type="button"
					onClick={showCreateGameForm}
				>
					Host a New Game
				</button>
				<button
					className="landing-page-btn landing-page__join-btn"
					type="button"
					onClick={showJoinGameForm}
				>
					Join a Game
				</button>
			</>
		);
	};

	return <div className="landing-page">{getInnerComponent()}</div>;
};
