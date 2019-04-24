const players = (players = {}, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			const player = players.byId['1']
			return ({
				...players,
				byId: {
					...players.byId,
					['1']: {
						...player,
						name: action.username,
					}
				},
			});
		default:
			return players;
	}
}

export default players;

