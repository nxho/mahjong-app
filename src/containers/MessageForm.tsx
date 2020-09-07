import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../actions';

import './MessageForm.css';

export const MessageForm = () => {
	const [message, setMessage] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();

	useEffect(() => {
		inputRef.current?.focus();
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		dispatch(sendMessage(message));

		setMessage('');
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<form className="form__message-form" onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className="input__message-form-text"
				type="text"
				value={message}
				onChange={handleChange}
			/>
			<button className="button__message-form-submit" type="submit">
				Send
			</button>
		</form>
	);
};
