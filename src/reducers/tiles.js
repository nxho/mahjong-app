const tiles = (state = [], action) => {
	switch (action.type) {
		case 'SWAP_TILE':
			console.log(`Swapping tile ${action.src_id} and ${action.dest_id}`);
			return state;
		default:
			return state;
	}
}

export default tiles;

