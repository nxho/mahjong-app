import {
	EXTEND_REVEALED_MELDS,
	SET_REVEALED_MELDS,
} from '../actions';
import update from 'immutability-helper';

const revealedMelds = (revealedMelds = [], action) => {
	switch(action.type) {
		case EXTEND_REVEALED_MELDS:
			const lastElIndex = revealedMelds.length - 1;
			return update(revealedMelds, { [lastElIndex]: { $push: [action.droppedTile] } });
		case SET_REVEALED_MELDS:
			return [...action.revealedMelds];
		default:
			return revealedMelds;
	}
};

export default revealedMelds;

