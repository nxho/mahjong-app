import React, {
	useEffect,
	useRef,
	useState,
} from 'react';

import './LandingPageInput.css';

export default function LandingPageInput({ labelText, placeholderText, value, onChange, onKeyDown, focusOnRender}) {
	const inputRef = useRef(null);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (!!focusOnRender && !focused) {
			inputRef.current.focus();
			setFocused(true);
		}
	}, [focusOnRender, focused]);

	return (
		<label>
			{ !!labelText && labelText }
			<input
				className='landing-page-input'
				ref={inputRef}
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholderText}
			/>
		</label>
	);
}
