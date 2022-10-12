import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tile } from '../components/Tile';
import { completeNewMeld } from '../actions';
import { MahjongState } from '../reducers';

export const NewMeld = () => {
	const { newMeld, newMeldTargetLength } = useSelector(
		({ player }: MahjongState) => player,
	);
	const dispatch = useDispatch();

	console.log(
		'Rendering <NewMeld /> with newMeld',
		newMeld,
		'and newMeldTargetLength',
		newMeldTargetLength,
	);

	useEffect(() => {
		if (newMeld.length > 0 && newMeld.length === newMeldTargetLength) {
			dispatch(completeNewMeld(newMeld));
		}
	});

	return (
		// FIXME: this is using styling from src/components/Melds.css, consolidate or something
		<div className="meld-container-row">
			{newMeld.map(({ suit, type }, tileIndex) => (
				<div className="meld-tile-container" key={tileIndex}>
					<Tile suit={suit} type={type} />
				</div>
			))}
		</div>
	);
};
