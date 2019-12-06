import {
	START_TURN,
	END_TURN,
	JOIN_GAME,
	REJOIN_GAME,
	UPDATE_ROOM_ID,
	UPDATE_TILES,
	UPDATE_CURRENT_STATE,
	MOVE_TILE,
	SELECT_TILE,
	UPDATE_DISCARDED_TILE,
	EXTEND_TILES,
	DRAW_TILE,
	CLAIM_TILE,
	PRE_REVEAL_MELD,
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
		validMeldSubsets: null,
	},
	action) => {
		switch (action.type) {
			case START_TURN:
				return {
					...player,
					isCurrentTurn: true,
				};
			// TODO: rename END_TURN and endTurn to discardTile
			case END_TURN:
				// Remove discarded tile from tiles
				let newTiles = player.tiles.slice();
				newTiles.splice(player.selectedTileIndex, 1)

				return {
					...player,
					isCurrentTurn: false,
					currentState: 'NO_ACTION',
					selectedTileIndex: null,
					tiles: newTiles,
				};
			case DRAW_TILE:
				return {
					...player,
					currentState: 'DISCARD_TILE',
				};
			case CLAIM_TILE:
				return {
					...player,
					currentState: action.claimType ? 'CLAIM_TILE' : 'NO_ACTION',
				};
			case PRE_REVEAL_MELD:
				return {
					...player,
					validMeldSubsets: action.validMeldSubsets,
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
			case MOVE_TILE:
				const { srcIndex, dstIndex } = action;
				const playerTiles = player.tiles;
				let selectedTileIndex = player.selectedTileIndex;

				if (selectedTileIndex != null) {
					if (srcIndex === selectedTileIndex) {
						// Update selectedTileIndex if it matches index of tile being dragged
						selectedTileIndex = dstIndex;
					} else if (selectedTileIndex <= Math.max(srcIndex, dstIndex)
						&& selectedTileIndex >= Math.min(srcIndex, dstIndex)) {
						// Update selectedTileIndex if it is in between the src and dst indices
						if (srcIndex < dstIndex) {
							selectedTileIndex--;
						} else {
							selectedTileIndex++;
						}
					}
				}

				console.log(`Removing tile at index=${srcIndex} and re-inserting at index=${dstIndex}`);

				const newPlayerTiles = playerTiles.slice();
				const tileToMove = newPlayerTiles[srcIndex];

				newPlayerTiles.splice(srcIndex, 1);
				newPlayerTiles.splice(dstIndex, 0, tileToMove);

				return {
					...player,
					tiles: newPlayerTiles,
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


