const messages = (messages = [], action) => {
	switch (action.type) {
		case 'UPDATE_MESSAGES':
			return [...messages, action.message];
		default:
			return messages;
	}
}

export default messages;

