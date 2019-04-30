const dealTilesToPlayers = (allTiles, playerIds) => {
	let gameTiles = [...allTiles.byId['game']];
	let lastTileIndex = gameTiles.length - 1;

	const allPlayerTiles = {};

	for (let id of playerIds) {
		let playerTiles = [];

		for (let i = 0; i < 14; i++) {
			const randIndex = Math.floor((Math.random() * 1000) % (lastTileIndex + 1));
			if (randIndex !== lastTileIndex) {
				const temp = gameTiles[lastTileIndex];
				gameTiles[lastTileIndex] = gameTiles[randIndex];
				gameTiles[randIndex] = temp;
			}
			playerTiles.push(gameTiles.pop());
			lastTileIndex--;
		}

		allPlayerTiles[id] = playerTiles;
	}

	return {
		...allTiles,
		byId: {
			...allTiles.byId,
			'game': gameTiles,
			...allPlayerTiles,
		}
	};
}

const tiles = (tiles = {}, action) => {
	switch (action.type) {
		case 'DEAL_TILES_TO_PLAYERS':
			console.log('Dealing tiles to players');
			return dealTilesToPlayers(tiles, action.playerIds);
		default:
			return tiles;
	}
}

export default tiles;

