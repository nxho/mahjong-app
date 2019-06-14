const socket = (socket = {}, action) => {
	switch (action.type) {
		case 'END_TURN':
			socket.emit('end_turn');
			return socket;
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

