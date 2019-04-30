const player = (player = { name: '', tiles: [] }, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...player,
				name: action.username,
			};
		case 'UPDATE_TILES':
			return {
				...player,
				tiles: action.tiles,
			};
		case 'SWAP_TILE':
			const { src_index, dst_index } = action;
			const playerTiles = player.tiles;
			console.log(`swapping tile index ${src_index} with ${dst_index} for player`);

			return {
				...player,
				// TODO: should tiles be its own slice of state?
				tiles: playerTiles.map((item, index) => {
					if (index === src_index) {
						return { ...playerTiles[dst_index] };
					} else if (index === dst_index) {
						return { ...playerTiles[src_index] };
					} else {
						return item;
					}
				})
			}
		default:
			return player;
	}
}

export default player;


