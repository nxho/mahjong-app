import React from 'react';
import { useSelector } from 'react-redux';
import { NewMeld } from './NewMeld';
import { Melds } from '../components/Melds';
import { MahjongState } from '../reducers';

export const PlayerMelds = () => {
	const { revealedMelds, concealedKongs, currentState } = useSelector(
		({ player }: MahjongState) => player,
	);

	console.log(
		'Rendering <PlayerMelds /> with revealedMelds:',
		revealedMelds,
		'concealedKongs:',
		concealedKongs,
		'currentState:',
		currentState,
	);

	return (
		<Melds
			melds={revealedMelds}
			concealedKongs={concealedKongs}
			position="bottom"
		>
			{currentState === 'REVEAL_MELD' && <NewMeld />}
		</Melds>
	);
};
