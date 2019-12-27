import {
	END_TURN,
	JOIN_GAME,
	REJOIN_GAME,
	LEAVE_GAME,
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
	SHOW_MELDABLE_TILES,
	SET_REVEALED_MELDS,
	EXTEND_NEW_MELD,
	COMPLETE_NEW_MELD,
	UPDATE_CAN_DECLARE_WIN,
	DECLARE_WIN,
	UPDATE_CAN_DECLARE_KONG,
	DECLARE_KONG,
	END_GAME,
} from '../actions';
import update from 'immutability-helper';

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
		revealedMelds: [],
		concealedKongs: [],
		newMeld: [],
		newMeldTargetLength: -1,
		canDeclareWin: false,
		canDeclareKong: false,
		isGameOver: false,
	},
	action) => {
		switch (action.type) {
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
					currentState: 'NO_ACTION',
				};
			case SHOW_MELDABLE_TILES:
				// Consolidate newValidMeldSubsets based on chosen or not chosen tile
				let newValidMeldSubsets = player.validMeldSubsets;
				if (action.droppedTileIndex !== null) {
					const { suit, type } = player.tiles[action.droppedTileIndex];
					const tileKey = `${suit.slice(0, 4)}_${type}`;
					newValidMeldSubsets = newValidMeldSubsets.map((subset) => {
						const index = subset.indexOf(tileKey);
						if (index >= 0) {
							return update(subset, {
								$splice: [[index, 1]],
							});
						}

						return null;
					}).filter(subset => !!subset && subset.length > 0);
					// console.log("dey should've changed", newValidMeldSubsets);
				}

				// Collect all tile keys that are valid
				const meldableTiles = new Set();
				newValidMeldSubsets.forEach((tile_set) => {
					tile_set.forEach(tile => meldableTiles.add(tile));
				});

				// Update meldable property on each valid tile
				return {
					...player,
					tiles: player.tiles.map((tile) => ({
						...tile,
						meldable: meldableTiles.has(`${tile.suit.slice(0, 4)}_${tile.type}`),
					})),
					validMeldSubsets: newValidMeldSubsets,
				};
			case PRE_REVEAL_MELD:
				return {
					...player,
					validMeldSubsets: action.validMeldSubsets,
					newMeld: action.newMeld,
					newMeldTargetLength: action.newMeldTargetLength,
				};
			case SET_REVEALED_MELDS:
				return {
					...player,
					revealedMelds: [...action.revealedMelds],
				};
			case EXTEND_NEW_MELD:
				const droppedTile = player.tiles[action.droppedTileIndex];

				return update(player, {
					tiles: { $splice: [[action.droppedTileIndex, 1]] },
					newMeld: { $push: [droppedTile] },
				});
			case COMPLETE_NEW_MELD:
				player.newMeld.sort((t1, t2) => {
					if (t1.type < t2.type) {
						return -1;
					} else if (t1.type > t2.type) {
						return 1;
					}

					return 0;
				});
				return {
					...player,
					revealedMelds: update(player.revealedMelds, { $push: [player.newMeld] }),
					newMeld: [],
					newMeldTargetLength: -1,
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
			case LEAVE_GAME:
				return {
					...player,
					inGame: false,
					roomId: null,
					tiles: [],
					discardedTile: null,
					selectedTileIndex: null,
					currentState: 'NO_ACTION',
					validMeldSubsets: null,
					revealedMelds: [],
					newMeld: [],
					newMeldTargetLength: -1,
					canDeclareWin: false,
					isGameOver: false,
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

				const tileToMove = player.tiles[srcIndex];
				return {
					...player,
					tiles: update(player.tiles, {
						$splice: [[srcIndex, 1], [dstIndex, 0, tileToMove]],
					}),
					selectedTileIndex,
				}
			case SELECT_TILE:
				return {
					...player,
					selectedTileIndex: action.tileIndex,
				}
			case UPDATE_CAN_DECLARE_WIN:
				return {
					...player,
					canDeclareWin: action.canDeclareWin,
				}
			case DECLARE_WIN:
				return {
					...player,
					currentState: 'NO_ACTION',
				}
			case UPDATE_CAN_DECLARE_KONG:
				return {
					...player,
					canDeclareKong: action.canDeclareKong,
				}
			case DECLARE_KONG:
				return {
					...player,
					currentState: 'NO_ACTION',
				}
			case END_GAME:
				return {
					...player,
					isGameOver: true,
				}
			default:
				return player;
		}
	}

export default player;


