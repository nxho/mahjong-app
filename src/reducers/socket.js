const socket = (socket = {}, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			socket.emit('enter_game', action.username);
			return socket;
		default:
			return socket;
	}
}

export default socket;

