import React, {
	useEffect,
	useRef,
	useState,
} from 'react';
import { connect } from 'react-redux';
import { updateUsername } from '../actions';

import './UsernameForm.css';

function UsernameForm({ onBack, onSubmit, updateUsername }) {

	const [username, setUsername] = useState('');
	const usernameInput = useRef(null);

	useEffect(() => {
		usernameInput.current.focus();
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		updateUsername(username);

		if (onSubmit != null) {
			onSubmit();
		}
	}

	const handleChange = (e) => {
		setUsername(e.target.value);
	}

	return (
		<form className='username-form' onSubmit={handleSubmit} data-testid='username-form'>
			<label>
				Name:
				<input
					ref={usernameInput}
					type="text"
					value={username}
					onChange={handleChange}
				/>
			</label>
			<input type="submit" value="Join Game" />
			<button className='back-btn' type="button" onClick={onBack}>Back</button>
		</form>
	);
}

const mapDispatchToProps = dispatch => ({
	updateUsername: (username) => dispatch(updateUsername(username)),
});

export default connect(
	null,
	mapDispatchToProps,
)(UsernameForm);

