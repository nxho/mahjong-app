import { updateOpponents, updateTiles, startTurn, updateMessages } from '../actions';

const createSocketMiddleware = (socket) => {
	return store => {
		// initialize socketio listeners
		socket.on('update_opponents', (opponents) => {
			console.log('Received "update_opponents" event from server, updating opponents to:', opponents);
			store.dispatch(updateOpponents(opponents));
		});
		socket.on('update_tiles', (tiles) => {
			console.log('Received "update_tiles" event from server, updating tiles to:', tiles);
			store.dispatch(updateTiles(tiles));
		});
		socket.on('start_turn', () => {
			console.log('Received "start_turn" event from server, enabling tile movement for player');
			store.dispatch(startTurn());
		});
		socket.on('update_discarded_tile', (tile) => {
			console.log('Received "update_discarded_tile" event from server, updating discarded tile to:', tile);
			// store.dispatch(updateDiscardedTile());
		});

		// TODO: store messages on server?
		// or at least update messages from server so that messages sent before
		// a user joins can be seen as well
		socket.on('text_message', (message) => {
			console.log(`Received "message" event from server, message='${message}'`);
			store.dispatch(updateMessages(message));
		});

		return next => action => {
			switch (action.type) {
				case 'END_TURN':
					socket.emit('end_turn');
					break;
				case 'SET_USERNAME':
					socket.emit('enter_game', action.username);
					break;
				case 'SEND_MESSAGE':
					socket.emit('text_message', action.message);
					break;
				default:
			}
			return next(action);
		}
	}
}

export default createSocketMiddleware;

