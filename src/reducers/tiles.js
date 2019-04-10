const tiles = (state = [], action) => {
	switch (action.type) {
		case 'SWAP_TILE':
			console.log(`swapping tile index ${action.src_index} with ${action.dst_index}`);
			return state;
		default:
			return state;
	}
}

export default tiles;

