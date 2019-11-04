export const SET_USERNAME = 'SET_USERNAME';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const UPDATE_OPPONENTS = 'UPDATE_OPPONENTS';

export const START_TURN = 'START_TURN';
export const END_TURN = 'END_TURN';

export const UPDATE_TILES = 'UPDATE_TILES';
export const SWAP_TILE = 'SWAP_TILE';
export const SELECT_TILE = 'SELECT_TILE';
export const UPDATE_DISCARDED_TILE = 'UPDATE_DISCARDED_TILE';

export const swapTile = (src_index, dst_index) => ({
	type: SWAP_TILE,
	src_index,
	dst_index,
});

export const setUsername = (username) => ({
	type: SET_USERNAME,
	username,
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

