export const dealTilesToPlayers = (playerIds) => ({
	type: 'DEAL_TILES_TO_PLAYERS',
	playerIds,
});

export const swapTile = (playerId, src_index, dst_index) => ({
	type: 'SWAP_TILE',
	playerId,
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

