const socket = (socket = {}, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			socket.emit('enter_game', action.username);
			return socket;
		case 'SEND_MESSAGE':
			socket.emit('text_message', action.message);
			return socket;
		default:
			return socket;
	}
}

export default socket;

