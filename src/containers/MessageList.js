import React, { useEffect, useRef } from 'react';

import './MessageList.css';

export default function MessageList({ messages }) {
	const messageEndRef = useRef(null);

	useEffect(() => {
		messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
	});

	return (
		<div className='div__message-list'>
			{
				messages.map((message, index) =>
					<div key={index}>{message}</div>
				)
			}
			<div ref={messageEndRef}></div>
		</div>
	);
};

