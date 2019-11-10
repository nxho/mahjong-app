import React, {
	useRef,
	useState,
} from 'react';
import { connect } from 'react-redux';

import LandingPageForm from './LandingPageForm';
import './LandingPage.css';

function LandingPage({ onSubmit }) {
	const [isFormVisible, setFormVisible] = useState(false);
	const [isRoomInputVisible, setRoomInputVisible] = useState(false);
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');
	const inputRef = useRef(null);

	const hideForm = () => {
		setFormVisible(false);
		setRoomInputVisible(false);
	};

	const showForm = () => {
		setFormVisible(true);
	};

	const createGame = (e) => {
		showForm();
	};

	const joinRandomGame = (e) => {
	};

	const joinRoomId = (e) => {
		showForm();
		setRoomInputVisible(true);
	};

	const handleFocusInput = () => {
		if (inputRef.current) {
			console.log('hye1');
			inputRef.current.focus();
		}
	};

	const handleSubmit = () => {
		console.log(`handleSubmit called, need to submit username=${username} and roomId=${roomId}`);
	};

	if (isFormVisible) {
		const inputs = [];

		if (isRoomInputVisible) {
			inputs.push(
				<label key='room-id-input'>
					Room ID:
					<input
						ref={inputRef}
						type="text"
						value={roomId}
						onChange={(e) => setRoomId(e.target.value)}
					/>
				</label>
			);
		}

		inputs.push(
			<label key='username-input'>
				Username:
				<input
					ref={inputRef}
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
		);

		return (
			<LandingPageForm onSubmit={handleSubmit} onHide={hideForm} onFocusInput={handleFocusInput}>
				{inputs}
			</LandingPageForm>
		);
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

