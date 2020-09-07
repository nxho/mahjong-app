import { Tile } from '../types';

export type Opponent = {
	name: string;
	revealedMelds: Meld[];
	concealedKongs: Meld[];
	tileCount: number;
	isCurrentTurn: boolean;
};

export type Meld = Tile[];

const opponents = (opponents: Opponent[] = [], action: any) => {
	switch (action.type) {
		case 'UPDATE_OPPONENTS':
			return action.opponents;
		default:
			return opponents;
	}
};

export default opponents;
