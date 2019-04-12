const initPlayers = () => {
	return [
		{
			name: 'Player 1',
			tiles: [],
			tileRotation: 0,
			direction: 'row'
		},
		{
			name: 'Player 2',
			tiles: [],
			tileRotation: .75,
			direction: 'column'
		},
		{
			name: 'Player 3',
			tiles: [],
			tileRotation: .25,
			direction: 'column'
		},
		{
			name: 'Player 4',
			tiles: [],
			tileRotation: .5,
			direction: 'row'
		}
	];
}

const dealTilesToPlayers = (players, tiles) => {
	let lastTileIndex = tiles.length - 1;
	for (let player of players) {
		for (let i = 0; i < 14; i++) {
			const randIndex = Math.floor((Math.random() * 1000) % (lastTileIndex + 1));
			if (randIndex !== lastTileIndex) {
				const temp = tiles[lastTileIndex];
				tiles[lastTileIndex] = tiles[randIndex];
				tiles[randIndex] = temp;
			}
			player.tiles.push(tiles.pop());
			lastTileIndex--;
		}
	}
}

const players = (players = initPlayers(), action) => {
	switch (action.type) {
		case 'DEAL_TILES_TO_PLAYERS':
			console.log('dealing tiles to players');
			return dealTilesToPlayers(players, action.tiles);
		case 'SWAP_TILE':
			const { playerId, src_index, dst_index } = action;
			const tiles = players[playerId].tiles;
			console.log(`swapping tile index ${src_index} with ${dst_index} for player ${playerId}`);

			return players.map((player, index) => {
				if (index === playerId) {
					return {
						...player,
						tiles: tiles.map((item, index) => {
							if (index === src_index) {
								return { ...tiles[dst_index] };
							} else if (index === dst_index) {
								return { ...tiles[src_index] };
							} else {
								return item;
							}
						}),
					};
				}
				return player;
			});
		default:
			return players;
	}
}

export default players;

