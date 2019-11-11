import React, {
	useRef,
	useState,
} from 'react';
import { connect } from 'react-redux';

import { joinGame } from '../actions';
import LandingPageForm from './LandingPageForm';
import './LandingPage.css';

function LandingPage({ onSubmit, joinGame }) {
	const [isFormVisible, setFormVisible] = useState(false);
	const [isRoomInputVisible, setRoomInputVisible] = useState(false);
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');
	const inputRef = useRef(null);

	const hideForm = () => {
		setFormVisible(false);
		setRoomInputVisible(false);
		setRoomId('');
		setUsername('');
	};

	const showForm = () => {
		setFormVisible(true);
	};

	const createGame = (e) => {
		showForm();

		// Generate random 6-char room id
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
		const charsLength = chars.length;

		// Shuffle chars first
		for (let i = 0; i < chars.length - 1; i++) {
			const j = Math.floor(Math.random() * (chars.length - 1 - i))
			if (j > 0) {
				[chars[i], chars[i + j]] = [chars[i + j], chars[i]]
			}
		}
		chars = chars.join('');
		console.log('shuffled chars:', chars);

		let res = '';
		for (let i = 0; i < 8; i++) {
			res += chars.charAt(Math.floor(Math.random() * charsLength));
		}
		console.log('generated room id:', res);

		setRoomId(res);
	};

	const joinRandomGame = (e) => {
		showForm();
	};

	const joinRoomId = (e) => {
		showForm();
		setRoomInputVisible(true);
	};

	const handleFocusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleSubmit = () => {
		console.log(`handleSubmit called, need to submit username=${username} and roomId=${roomId}`);
		joinGame(username, roomId);
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

const mapDispatchToProps = dispatch => ({
	joinGame: (username, roomId) => dispatch(joinGame(username, roomId)),
});

export default connect(
	null,
	mapDispatchToProps,
)(LandingPage);

