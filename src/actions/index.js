export const JOIN_GAME = 'JOIN_GAME';
export const REJOIN_GAME = 'REJOIN_GAME';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const UPDATE_CURRENT_STATE = 'UPDATE_CURRENT_STATE';
export const UPDATE_ROOM_ID = 'UPDATE_ROOM_ID';
export const UPDATE_OPPONENTS = 'UPDATE_OPPONENTS';

export const START_TURN = 'START_TURN';
export const END_TURN = 'END_TURN';

export const EXTEND_TILES = 'EXTEND_TILES';
export const DRAW_TILE = 'DRAW_TILE';
export const UPDATE_TILES = 'UPDATE_TILES';
export const MOVE_TILE = 'MOVE_TILE';
export const SELECT_TILE = 'SELECT_TILE';
export const UPDATE_DISCARDED_TILE = 'UPDATE_DISCARDED_TILE';
export const CLAIM_TILE = 'CLAIM_TILE';
export const PRE_REVEAL_MELD = 'PRE_REVEAL_MELD';

export const moveTile = (srcIndex, dstIndex) => ({
	type: MOVE_TILE,
	srcIndex,
	dstIndex,
});

export const joinGame = (username, roomId) => ({
	type: JOIN_GAME,
	username,
	roomId,
});

export const rejoinGame = (payload) => ({
	type: REJOIN_GAME,
	payload,
});

export const sendMessage = (message) => ({
	type: SEND_MESSAGE,
	message,
});

export const updateOpponents = (opponents) => ({
	type: UPDATE_OPPONENTS,
	opponents,
});

export const updateTiles = (tiles) => ({
	type: UPDATE_TILES,
	tiles,
});

export const startTurn = () => ({
	type: START_TURN,
});

export const endTurn = (discardedTile) => ({
	type: END_TURN,
	discardedTile,
});

export const updateMessages = (message) => ({
	type: UPDATE_MESSAGES,
	message,
});

export const selectTile = (tileIndex) => ({
	type: SELECT_TILE,
	tileIndex,
});

export const updateDiscardedTile = (discardedTile) => ({
	type: UPDATE_DISCARDED_TILE,
	discardedTile,
});

export const updateRoomId = (roomId) => ({
	type: UPDATE_ROOM_ID,
	roomId,
});

export const updateCurrentState = (newState) => ({
	type: UPDATE_CURRENT_STATE,
	newState,
});

export const drawTile = () => ({
	type: DRAW_TILE,
});

export const extendTiles = (newTile) => ({
	type: EXTEND_TILES,
	newTile,
});

export const claimTile = (claimType) => ({
	type: CLAIM_TILE,
	claimType,
});

export const showTilesForRevealedMeld = (validMeldSubsets) => ({
	type: PRE_REVEAL_MELD,
	validMeldSubsets,
});

