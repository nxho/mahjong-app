import {
	CLAIM_TILE,
	COMPLETE_NEW_MELD,
	DECLARE_KONG,
	DECLARE_WIN,
	DRAW_TILE,
	END_TURN,
	JOIN_GAME,
	LEAVE_GAME,
	RECEIVE_PENDING_EVENTS,
	SEND_MESSAGE,
	claimTile,
	extendTiles,
	updateCurrentState,
	updateDiscardedTile,
	updateMessages,
	updateOpponents,
	updateRoomId,
	updateTiles,
	rejoinGame,
	updateValidMeldSubsets,
	setRevealedMelds,
	receivePendingEvents,
	showMeldableTiles,
	updateCanDeclareWin,
	updateCanDeclareKong,
	endGame,
	updateConcealedKongs,
} from '../actions';

import uuidv1 from 'uuid/v1';

const createSocketMiddleware = (socket) => {
	let declareClaimTimer = null;
	return store => {
		// Initialize socketio listeners
		socket.on('connect', () => {
			// Data to retrieve from server when socket is initialized
			socket.emit('get_possible_states', (payload) => {
				console.log('states payload:', payload);
			});
			const request = {
				'player-uuid': localStorage.getItem('mahjong-player-uuid'),
			};
			socket.emit('rejoin_game', request, (playerData) => {
				if (playerData) {
					const { username, roomId } = playerData;
					if (!roomId) {
						console.log('No game in progress, display landing page');
					} else {
						console.log(`Player ${username} is in active room_id=${roomId}, rejoining game in progress`);

						console.log('Player data:', playerData);

						// Assign key to each tile for stable rendering
						playerData.tiles.forEach((item) => {
							item.key = uuidv1()
						});

						// TODO: don't automatically copy playerdata, maybe should explicitly state which properties
						// 			 to include
						store.dispatch(rejoinGame(playerData));
						store.dispatch(receivePendingEvents());
					}
				} else {
					console.log('Something went horribly wrong');
				}
			});
		});
		socket.on('update_opponents', (opponents) => {
			console.log('Received "update_opponents" event from server, updating opponents to:', opponents);
			store.dispatch(updateOpponents(opponents));
		});
		socket.on('update_tiles', (tiles) => {
			console.log('Received "update_tiles" event from server, updating tiles to:', tiles);
			tiles.forEach((tile) => {
				tile.key = uuidv1();
			});
			store.dispatch(updateTiles(tiles));
		});
		socket.on('extend_tiles', (tile) => {
			console.log('Received "extend_tiles" event from server, adding tile:', tile);

			// Assign key to new tile for stable rendering
			tile.key = uuidv1();

			store.dispatch(extendTiles(tile));
		});
		socket.on('update_discarded_tile', (tile) => {
			console.log('Received "update_discarded_tile" event from server, updating discarded tile to:', tile);
			store.dispatch(updateDiscardedTile(tile));
		});
		socket.on('update_room_id', (roomId) => {
			console.log('Received "update_room_id" event from server, updating room ID to:', roomId);
			store.dispatch(updateRoomId(roomId));
		});
		socket.on('update_current_state', (state) => {
			console.log('Received "update_state" event from server, updating player action state to:', state);
			store.dispatch(updateCurrentState(state));
		});
		socket.on('declare_claim_with_timer', (payload) => {
			let { startTime, msDuration } = payload;
			if (!startTime) {
				socket.emit('declare_claim_start', {
					declareClaimStartTime: new Date().toISOString(),
				});
			} else {
				msDuration -= Date.now() - new Date(Date.parse(startTime));
			}

			if (msDuration <= 0) {
				store.dispatch(claimTile(null));
			} else {
				declareClaimTimer = setTimeout(() => {
					store.dispatch(claimTile(null));
				}, msDuration);
			}
		});
		socket.on('valid_tile_sets_for_meld', (payload) => {
			let { validMeldSubsets, newMeld, newMeldTargetLength } = payload;
			validMeldSubsets = validMeldSubsets.map((subset) => (subset.map(({suit, type}) => `${suit.slice(0, 4)}_${type}`)));
			console.log('Dispatching updateValidMeldSubsets');
			store.dispatch(updateValidMeldSubsets(validMeldSubsets, newMeld, newMeldTargetLength));
			console.log('Dispatching showMeldableTiles');
			store.dispatch(showMeldableTiles(null));
		});
		socket.on('update_revealed_melds', (revealedMelds) => {
			store.dispatch(setRevealedMelds(revealedMelds));
		});
		socket.on('update_can_declare_win', (canDeclareWin) => {
			console.log('Received "update_can_declare_win" event from server, updating canDeclareWin to:', canDeclareWin);
			store.dispatch(updateCanDeclareWin(canDeclareWin));
		});
		socket.on('update_can_declare_kong', (canDeclareKong) => {
			console.log('Received "update_can_declare_kong" event from server, updating canDeclareKong to:', canDeclareKong);
			store.dispatch(updateCanDeclareKong(canDeclareKong));
		});
		socket.on('update_concealed_kongs', (concealedKongs) => {
			store.dispatch(updateConcealedKongs(concealedKongs));
		});
		socket.on('end_game', () => {
			console.log('Received "end_game" event from server');
			store.dispatch(endGame());
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
				case RECEIVE_PENDING_EVENTS:
					console.log('Emitting event reemit_events');
					socket.emit('reemit_events');
					break;
				case DRAW_TILE:
					console.log('Emitting event draw_tile');
					socket.emit('draw_tile');
					break;
				case CLAIM_TILE:
					// TODO: clean up maybe
					if (declareClaimTimer) {
						clearTimeout(declareClaimTimer);
					}
					console.log('Emitting event update_claim_state');
					socket.emit('update_claim_state', {
						declared_meld: action.claimType,
					});
					break;
				case COMPLETE_NEW_MELD:
					const new_meld = action.newMeld.map(({ suit, type }) => ({ suit, type }));
					console.log(`Emitting event complete_new_meld with new_meld=${new_meld}`);
					socket.emit('complete_new_meld', { new_meld });
					break;
				case END_TURN:
					const { tiles, selectedTileIndex } = store.getState().player;
					const { suit, type } = tiles[selectedTileIndex];

					console.log('Emitting event end_turn');
					socket.emit('end_turn', {
						discarded_tile: {
							suit,
							type,
						},
					});
					break;
				case JOIN_GAME:
					console.log('Emitting event enter_game');
					socket.emit('enter_game', {
						username: action.username,
						room_id: action.roomId,
						player_uuid: localStorage.getItem('mahjong-player-uuid'),
					});
					break;
				case LEAVE_GAME:
					console.log('Emitting event leave_game');
					socket.emit('leave_game');
					break;
				case SEND_MESSAGE:
					console.log('Emitting event text_message');
					socket.emit('text_message', {
						message: action.message,
					});
					break;
				case DECLARE_WIN:
					console.log('Emitting event declare_win');
					socket.emit('declare_win');
					break;
				case DECLARE_KONG:
					console.log('Emitting event declare_concealed_kong');
					socket.emit('declare_concealed_kong');
					break;
				default:
			}
			return next(action);
		}
	}
}

export default createSocketMiddleware;

