import React, { useState } from 'react';
import LandingPageInput from './LandingPageInput';

import './LandingPageForm.css';

type Props = {
	onHide: () => void;
	onSubmit: (username: string, roomId: string) => void;
	showRoomIdInput: boolean;
};

export const LandingPageForm = ({
	onHide,
	onSubmit,
	showRoomIdInput,
}: Props) => {
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');

	const handleClickSubmit = (e: React.MouseEvent | React.FormEvent) => {
		e.preventDefault();
		onSubmit(username, roomId);
	};

	return (
		<form className="landing-page-form" onSubmit={handleClickSubmit}>
			<LandingPageInput
				className="landing-page-input__username"
				placeholderText="Username"
				value={username}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setUsername(e.target.value)
				}
				focusOnRender={true}
			/>
			{showRoomIdInput && (
				<LandingPageInput
					className="landing-page-input__room-id"
					placeholderText="Room ID (optional)"
					value={roomId}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setRoomId(e.target.value)
					}
				/>
			)}
			<div className="landing-page-form__btn-row">
				<button
					className="landing-page-form__back-btn"
					type="button"
					onClick={onHide}
				>
					Back
				</button>
				<button
					className="landing-page-form__submit-btn"
					type="submit"
					onClick={handleClickSubmit}
				>
					Submit
				</button>
			</div>
		</form>
	);
};
