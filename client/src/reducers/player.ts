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
	UPDATE_CONCEALED_KONGS,
	UPDATE_PLAYER,
} from '../actions';
import update from 'immutability-helper';
import { v4 } from 'uuid';

const isPlayerInCurrentTurnState = (state: any) => {
	const currentTurnStates = new Set([
		'DRAW_TILE',
		'DISCARD_TILE',
		'REVEAL_MELD',
	]);
	return currentTurnStates.has(state);
};

export type Player = {
	inGame: boolean;
	isGameInProgress: boolean;
	isGameOver: boolean;
	roomId: string | null;
	username: string;
	tiles: any[];
	isCurrentTurn: boolean;
	discardedTile: any | null;
	selectedTileIndex: number | null;
	currentState: string;
	validMeldSubsets: any[];
	revealedMelds: any[];
	concealedKongs: any[];
	newMeld: any[];
	newMeldTargetLength: number;
	canDeclareWin: boolean;
	canDeclareKong: boolean;
	pastDiscardedTiles: any[];
};

const initPlayer = (): Player => ({
	inGame: false,
	isGameInProgress: false,
	isGameOver: false,
	roomId: null,
	username: '',
	tiles: [],
	isCurrentTurn: false,
	discardedTile: null,
	selectedTileIndex: null,
	currentState: 'NO_ACTION',
	validMeldSubsets: [],
	revealedMelds: [],
	concealedKongs: [],
	newMeld: [],
	newMeldTargetLength: -1,
	canDeclareWin: false,
	canDeclareKong: false,
	pastDiscardedTiles: [],
});

const player = (player: Player = initPlayer(), action: any) => {
	switch (action.type) {
		// TODO: rename END_TURN and endTurn to discardTile
		case END_TURN:
			if (!player.selectedTileIndex) {
				return player;
			}

			// Remove discarded tile from tiles
			const newTiles = player.tiles.slice();
			newTiles.splice(player.selectedTileIndex, 1);

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
				currentState: 'NO_ACTION',
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
				newValidMeldSubsets = newValidMeldSubsets
					.map((subset) => {
						const index = subset.indexOf(tileKey);
						if (index >= 0) {
							return update(subset, {
								$splice: [[index, 1]],
							});
						}

						return null;
					})
					.filter((subset) => !!subset && subset.length > 0);
				// console.log("dey should've changed", newValidMeldSubsets);
			}

			// Collect all tile keys that are valid
			const meldableTiles = new Set();
			newValidMeldSubsets.forEach((tile_set: any[]) => {
				tile_set.forEach((tile) => meldableTiles.add(tile));
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
				revealedMelds: update(player.revealedMelds, {
					$push: [player.newMeld],
				}),
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
				isCurrentTurn: isPlayerInCurrentTurnState(action.payload.currentState),
				inGame: true,
			};
		case LEAVE_GAME:
			return initPlayer();
		case UPDATE_CURRENT_STATE:
			return {
				...player,
				isCurrentTurn: isPlayerInCurrentTurnState(action.newState),
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
			if (!action.discardedTile) {
				return {
					...player,
					discardedTile: null,
				};
			}
			return {
				...player,
				pastDiscardedTiles: player.discardedTile
					? update(player.pastDiscardedTiles, {
							$push: [player.discardedTile],
					  })
					: player.pastDiscardedTiles,
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
				} else if (
					selectedTileIndex <= Math.max(srcIndex, dstIndex) &&
					selectedTileIndex >= Math.min(srcIndex, dstIndex)
				) {
					// Update selectedTileIndex if it is in between the src and dst indices
					if (srcIndex < dstIndex) {
						selectedTileIndex--;
					} else {
						selectedTileIndex++;
					}
				}
			}

			console.log(
				`Removing tile at index=${srcIndex} and re-inserting at index=${dstIndex}`,
			);

			const tileToMove = player.tiles[srcIndex];
			return {
				...player,
				tiles: update(player.tiles, {
					$splice: [
						[srcIndex, 1],
						[dstIndex, 0, tileToMove],
					],
				}),
				selectedTileIndex,
			};
		case SELECT_TILE:
			return {
				...player,
				selectedTileIndex: action.tileIndex,
			};
		case UPDATE_CAN_DECLARE_WIN:
			return {
				...player,
				canDeclareWin: action.canDeclareWin,
			};
		case DECLARE_WIN:
			return {
				...player,
				currentState: 'NO_ACTION',
			};
		case UPDATE_CAN_DECLARE_KONG:
			return {
				...player,
				canDeclareKong: action.canDeclareKong,
			};
		case DECLARE_KONG:
			return {
				...player,
				currentState: 'NO_ACTION',
			};
		case END_GAME:
			return {
				...player,
				isGameOver: true,
			};
		case UPDATE_CONCEALED_KONGS:
			return {
				...player,
				concealedKongs: action.concealedKongs,
			};
		case UPDATE_PLAYER:
			const actionPlayer = action.player;

			// Do additional processing for a property if object to be merged contains specified prop
			if (actionPlayer.hasOwnProperty('tiles')) {
				// Assign key to each tile for stable rendering
				actionPlayer.tiles.forEach((tile: any) => {
					tile.key = v4();
				});
			}

			console.log("Updating/merging server's player data with:", actionPlayer);

			return {
				...update(player, { $merge: actionPlayer }),
				// TODO: move setting of this property to server-side code? I know this is used for client-specific
				// logic but maybe it makes more sense on server side, since server knows when it should be updated
				// FIXME: PLEASE FIX THIS THIS IS SO BAD
				isCurrentTurn: isPlayerInCurrentTurnState(
					actionPlayer.currentState
						? actionPlayer.currentState
						: player.currentState,
				),
			};
		default:
			return player;
	}
};

export default player;
