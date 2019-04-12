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

