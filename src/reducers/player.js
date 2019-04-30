const player = (player = {}, action) => {
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
		default:
			return player;
	}
}

export default player;


