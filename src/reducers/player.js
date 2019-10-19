const player = (
	player = {
		name: '',
		tiles: [],
		isCurrentTurn: false,
		discardedTile: null,
		selectedTileIndex: null,
	},
	action) => {
		switch (action.type) {
			case 'START_TURN':
				return {
					...player,
					isCurrentTurn: true,
				};
			case 'END_TURN':
				return {
					...player,
					isCurrentTurn: false,
				};
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
				let selectedTileIndex = player.selectedTileIndex;

				// Have to update the selectedTileIndex every time we swap
				if (src_index === selectedTileIndex) {
					selectedTileIndex = dst_index;
				} else if (dst_index === selectedTileIndex) {
					selectedTileIndex = src_index;
				}

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
					}),
					selectedTileIndex,
				}
			case 'SELECT_TILE':
				return {
					...player,
					selectedTileIndex: action.tileIndex,
				}
			default:
				return player;
		}
	}

export default player;


