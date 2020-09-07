import React, { useEffect, useRef, useState } from 'react';

import './LandingPageInput.css';

type Props = {
	className: string;
	placeholderText: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	focusOnRender?: boolean;
};

export default function LandingPageInput({
	className,
	placeholderText,
	value,
	onChange,
	focusOnRender,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (!!focusOnRender && !focused) {
			inputRef.current?.focus();
			setFocused(true);
		}
	}, [focusOnRender, focused]);

	return (
		<input
			className={'landing-page-input' + (className ? ` ${className}` : '')}
			ref={inputRef}
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholderText}
		/>
	);
}
