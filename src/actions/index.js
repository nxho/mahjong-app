export const swapTile = (playerId, src_index, dst_index) => ({
	type: 'SWAP_TILE',
	playerId,
	src_index,
	dst_index,
});

export const initTiles = () => ({
	type: 'INIT_TILES',
});

export const initPlayers = () => ({
	type: 'INIT_PLAYERS',
});

export const dealTilesToPlayers = (tiles) => ({
	type: 'DEAL_TILES_TO_PLAYERS',
	tiles,
});


