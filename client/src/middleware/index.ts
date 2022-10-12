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
	START_GAME,
	claimTile,
	extendTiles,
	updateDiscardedTile,
	updateMessages,
	updateOpponents,
	updateValidMeldSubsets,
	receivePendingEvents,
	showMeldableTiles,
	endGame,
	updatePlayer,
} from '../actions';
import { Middleware } from 'redux';

import { v4 as uuidv4 } from 'uuid';
import { Message } from '../reducers/messages';

const createSocketMiddleware = (socket: SocketIOClient.Socket): Middleware => {
	let declareClaimTimer: NodeJS.Timeout | null = null;
	return (store) => {
		// Initialize socketio listeners
		socket.on('connect', () => {
			// Data to retrieve from server once socket connection is established
			socket.emit('get_possible_states', (payload: any) => {
				console.log('states payload:', payload);
			});
			const request = {
				'player-uuid': localStorage.getItem('mahjong-player-uuid'),
			};
			socket.emit('rejoin_game', request, (playerData: any) => {
				if (playerData) {
					const { username, roomId } = playerData;
					if (!roomId) {
						console.log('No game in progress, display landing page');
					} else {
						console.log(
							`Player ${username} is in active room_id=${roomId}, rejoining game in progress`,
						);

						console.log('Player data:', playerData);

						store.dispatch(
							updatePlayer({
								...playerData,
								inGame: true,
							}),
						);
						store.dispatch(receivePendingEvents());
					}
				} else {
					console.log('Something went horribly wrong');
				}
			});
		});

		// Update subset of player data
		socket.on('update_player', (player: any) => {
			store.dispatch(updatePlayer(player));
		});

		socket.on('update_opponents', (opponents: any[]) => {
			console.log(
				'Received "update_opponents" event from server, updating opponents to:',
				opponents,
			);
			store.dispatch(updateOpponents(opponents));
		});
		socket.on('update_tiles', (tiles: any[]) => {
			console.log(
				'Received "update_tiles" event from server, updating tiles to:',
				tiles,
			);

			store.dispatch(updatePlayer({ tiles }));
		});
		socket.on('extend_tiles', (tile: any) => {
			console.log(
				'Received "extend_tiles" event from server, adding tile:',
				tile,
			);

			// Assign key to new tile for stable rendering
			tile.key = uuidv4();

			store.dispatch(extendTiles(tile));
		});
		socket.on('update_discarded_tile', (discardedTile: any) => {
			console.log(
				'Received "update_discarded_tile" event from server, updating discarded tile to:',
				discardedTile,
			);

			store.dispatch(updateDiscardedTile(discardedTile));
		});
		socket.on('update_room_id', (roomId: string) => {
			console.log(
				'Received "update_room_id" event from server, updating room ID to:',
				roomId,
			);

			store.dispatch(updatePlayer({ roomId }));
		});
		socket.on('update_current_state', (currentState: any) => {
			console.log(
				'Received "update_state" event from server, updating player action state to:',
				currentState,
			);

			store.dispatch(updatePlayer({ currentState }));
		});
		socket.on('declare_claim_with_timer', (payload: any) => {
			let { startTime, msDuration } = payload;
			if (!startTime) {
				socket.emit('declare_claim_start', {
					declareClaimStartTime: new Date().toISOString(),
				});
			} else {
				msDuration -= Date.now() - Date.parse(startTime);
			}

			if (msDuration <= 0) {
				store.dispatch(claimTile(null));
			} else {
				declareClaimTimer = setTimeout(() => {
					store.dispatch(claimTile(null));
				}, msDuration);
			}
		});
		socket.on('valid_tile_sets_for_meld', (payload: any) => {
			let { validMeldSubsets, newMeld, newMeldTargetLength } = payload;
			validMeldSubsets = validMeldSubsets.map((subset: any) =>
				subset.map(
					({ suit, type }: { suit: string; type: string }) =>
						`${suit.slice(0, 4)}_${type}`,
				),
			);

			console.log('Dispatching updateValidMeldSubsets');
			store.dispatch(
				updateValidMeldSubsets(validMeldSubsets, newMeld, newMeldTargetLength),
			);

			console.log('Dispatching showMeldableTiles');
			store.dispatch(showMeldableTiles(null));
		});
		socket.on('update_revealed_melds', (revealedMelds: any[]) => {
			console.log(
				'Received "update_revealed_melds" event from server, updating revealedMelds to:',
				revealedMelds,
			);

			store.dispatch(updatePlayer({ revealedMelds }));
		});
		socket.on('update_can_declare_win', (canDeclareWin: boolean) => {
			console.log(
				'Received "update_can_declare_win" event from server, updating canDeclareWin to:',
				canDeclareWin,
			);

			store.dispatch(updatePlayer({ canDeclareWin }));
		});
		socket.on('update_can_declare_kong', (canDeclareKong: boolean) => {
			console.log(
				'Received "update_can_declare_kong" event from server, updating canDeclareKong to:',
				canDeclareKong,
			);

			store.dispatch(updatePlayer({ canDeclareKong }));
		});
		socket.on('update_concealed_kongs', (concealedKongs: boolean) => {
			console.log(
				'Received "update_concealed_kongs" event from server, updating concealedKongs to:',
				concealedKongs,
			);

			store.dispatch(updatePlayer({ concealedKongs }));
		});
		socket.on('end_game', () => {
			console.log('Received "end_game" event from server');

			store.dispatch(endGame());
		});

		// TODO: store messages on server?
		// or at least update messages from server so that messages sent before
		// a user joins can be seen as well
		socket.on('text_message', (message: Message) => {
			console.log('Received "message" event from server:', message);
			store.dispatch(updateMessages(message));
		});

		// Inform server that client event handlers have been initialized, this is a bit different (I think)
		// than the logic that is inside the client's 'connect' event handler
		socket.emit('ready', {
			'player-uuid': localStorage.getItem('mahjong-player-uuid'),
		});

		return (next) => (action) => {
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
					type Tile = {
						suit: string;
						type: string;
					};
					type TileWithKey = {
						key: string;
					} & Tile;

					const new_meld = action.newMeld.map(
						({ suit, type }: TileWithKey): Tile => ({ suit, type }),
					);
					console.log(
						`Emitting event complete_new_meld with new_meld=${new_meld}`,
					);
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
						should_create_room: action.shouldCreateRoom,
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
				case START_GAME:
					console.log('Emitting event start_game');
					socket.emit('start_game');
					break;
				default:
			}
			return next(action);
		};
	};
};

export default createSocketMiddleware;
