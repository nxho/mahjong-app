export const swapTile = (src_index, dst_index) => ({
	type: 'SWAP_TILE',
	src_index,
	dst_index,
});

export const setUsername = (username) => ({
	type: 'SET_USERNAME',
	username,
});

export const sendMessage = (message) => ({
	type: 'SEND_MESSAGE',
	message,
});

export const updateOpponents = (opponents) => ({
	type: 'UPDATE_OPPONENTS',
	opponents,
});

export const updateTiles = (tiles) => ({
	type: 'UPDATE_TILES',
	tiles,
});

export const startTurn = () => ({
	type: 'START_TURN',
});

export const endTurn = () => ({
	type: 'END_TURN',
});

export const updateMessages = (message) => ({
	type: 'UPDATE_MESSAGES',
	message,
});

