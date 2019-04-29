const opponents = (opponents = [], action) => {
	switch (action.type) {
		case 'UPDATE_OPPONENTS':
			return action.opponents;
		default:
			return opponents;
	}
}

export default opponents;

