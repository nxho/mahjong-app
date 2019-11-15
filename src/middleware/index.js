import {
	END_TURN,
	JOIN_GAME,
	REJOIN_GAME,
	SEND_MESSAGE,
	updateDiscardedTile,
	updateMessages,
	updateOpponents,
	updateRoomId,
	updateTiles,
	startTurn,
	rejoinGame,
} from '../actions';

const createSocketMiddleware = (socket) => {
	return store => {
		// Initialize socketio listeners
		socket.on('connect', () => {
			// Data to retrieve from server when socket is initialized
			socket.emit('get_possible_states', (payload) => {
				console.log('states payload:', payload);
			});
			const req_payload = {
				'player-uuid': localStorage.getItem('mahjong-player-uuid'),
			};
			socket.emit('get_existing_game_data', req_payload, (playerData) => {
				const { username, roomId } = playerData;
				if (!roomId) {
					console.log('No game in progress, display landing page');
				} else {
					console.log(`Player ${username} is in active room_id=${roomId}, rejoining game in progress`);

					console.log('Player data:', playerData);

					store.dispatch(rejoinGame(playerData));
				}
			});
		});
		socket.on('update_opponents', (opponents) => {
			console.log('Received "update_opponents" event from server, updating opponents to:', opponents);
			store.dispatch(updateOpponents(opponents));
		});
		socket.on('update_tiles', (tiles) => {
			console.log('Received "update_tiles" event from server, updating tiles to:', tiles);
			store.dispatch(updateTiles(tiles));
		});
		socket.on('update_discarded_tile', (tile) => {
			console.log('Received "update_discarded_tile" event from server, updating discarded tile to:', tile);
			store.dispatch(updateDiscardedTile(tile));
		});
		socket.on('start_turn', () => {
			console.log('Received "start_turn" event from server, enabling tile movement for player');
			store.dispatch(startTurn());
		});
		socket.on('update_room_id', (roomId) => {
			console.log('Received "update_room_id" event from server, updating room ID to:', roomId);
			store.dispatch(updateRoomId(roomId));
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
				case END_TURN:
					socket.emit('end_turn', {
						discarded_tile: action.discardedTile,
					});
					break;
				case JOIN_GAME:
					socket.emit('enter_game', {
						username: action.username,
						room_id: action.roomId,
						player_uuid: localStorage.getItem('mahjong-player-uuid'),
					});
					break;
				case REJOIN_GAME:
					socket.emit('rejoin_game', {
						username: action.payload.name,
						room_id: action.payload.roomId,
						player_uuid: localStorage.getItem('mahjong-player-uuid'),
					});
					break;
				case SEND_MESSAGE:
					socket.emit('text_message', {
						message: action.message,
					});
					break;
				default:
			}
			return next(action);
		}
	}
}

export default createSocketMiddleware;

