import {
	START_TURN,
	END_TURN,
	JOIN_GAME,
	REJOIN_GAME,
	UPDATE_ROOM_ID,
	UPDATE_TILES,
	UPDATE_CURRENT_STATE,
	SWAP_TILE,
	SELECT_TILE,
	UPDATE_DISCARDED_TILE,
	EXTEND_TILES,
	DRAW_TILE,
} from '../actions';

const player = (
	player = {
		inGame: false,
		roomId: null,
		username: '',
		tiles: [],
		isCurrentTurn: false,
		discardedTile: null,
		selectedTileIndex: null,
		currentState: 'NO_ACTION',
	},
	action) => {
		switch (action.type) {
			case START_TURN:
				return {
					...player,
					isCurrentTurn: true,
				};
			case END_TURN:
				return {
					...player,
					isCurrentTurn: false,
					currentState: 'NO_ACTION',
					selectedTileIndex: null,
				};
			case DRAW_TILE:
				return {
					...player,
					currentState: 'DISCARD_TILE',
				};
			case JOIN_GAME:
				return {
					...player,
					username: action.username,
					inGame: true,
				};
			case REJOIN_GAME:
				return {
					...player,
					...action.payload,
					inGame: true,
				};
			case UPDATE_CURRENT_STATE:
				return {
					...player,
					currentState: action.newState,
				};
			case UPDATE_ROOM_ID:
				return {
					...player,
					roomId: action.roomId,
				};
			case UPDATE_TILES:
				return {
					...player,
					tiles: action.tiles,
				};
			case UPDATE_DISCARDED_TILE:
				return {
					...player,
					discardedTile: action.discardedTile,
				};
			case EXTEND_TILES:
				return {
					...player,
					tiles: [...player.tiles, action.newTile],
				};
			case SWAP_TILE:
				const { src_index, dst_index } = action;
				const playerTiles = player.tiles;
				let selectedTileIndex = player.selectedTileIndex;

				// Have to update the selectedTileIndex every time we swap
				if (src_index === selectedTileIndex) {
					selectedTileIndex = dst_index;
				} else if (dst_index === selectedTileIndex) {
					selectedTileIndex = src_index;
				}

				console.log(`swapping tile index ${src_index} with ${dst_index} for player`);

				return {
					...player,
					// TODO: should tiles be its own slice of state?
					tiles: playerTiles.map((item, index) => {
						if (index === src_index) {
							return { ...playerTiles[dst_index] };
						} else if (index === dst_index) {
							return { ...playerTiles[src_index] };
						} else {
							return item;
						}
					}),
					selectedTileIndex,
				}
			case SELECT_TILE:
				return {
					...player,
					selectedTileIndex: action.tileIndex,
				}
			default:
				return player;
		}
	}

export default player;


