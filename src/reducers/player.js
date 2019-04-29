const player = (player = {}, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...player,
				name: action.username,
			};
		default:
			return player;
	}
}

export default player;


