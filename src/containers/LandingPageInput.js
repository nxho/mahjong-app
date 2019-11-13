import React, {
	useEffect,
	useRef,
} from 'react';

export default function LandingPageInput({ labelText, value, onChange, onKeyDown }) {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	return (
		<label>
			{labelText}
			<input
				ref={inputRef}
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</label>
	);
}
