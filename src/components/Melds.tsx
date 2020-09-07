import React, { PropsWithChildren } from 'react';
import { Tile } from './Tile';
import { HiddenTile } from './HiddenTile';

import './Melds.css';
import { Meld } from '../reducers/opponents';

type Props = PropsWithChildren<{
	melds: Meld[];
	concealedKongs: Meld[];
	position: string;
}>;

export const Melds = ({ melds, concealedKongs, children, position }: Props) => {
	let rotation = null;
	let direction = 'row';
	if (position === 'top') {
		rotation = '180';
	} else if (position === 'left') {
		rotation = 'cw';
		direction = 'column';
	} else if (position === 'right') {
		rotation = 'ccw';
		direction = 'column';
	}

	let tileContentClassName = '';
	let meldContainerClassName = `meld-container-${direction}`;
	let meldTileContainerClassName = 'meld-tile-container';
	if (rotation) {
		tileContentClassName = `img--rotated-${rotation}`;
		meldContainerClassName += ` meld-container-${rotation}`;
		meldTileContainerClassName += ` meld-tile-container-${rotation}`;
	}

	const numOfMelds = melds ? melds.length : 0;
	const numOfConcealedKongs = concealedKongs ? concealedKongs.length : 0;

	const renderMelds = () => (
		<>
			{numOfMelds > 0 &&
				melds.map((meld, meldIndex) => (
					<div
						className={
							meldContainerClassName +
							(meldIndex === numOfMelds - 1
								? ` meld-container-${direction}-last`
								: '')
						}
						key={meldIndex}
					>
						{meld.length > 0 &&
							meld.map(({ suit, type }, tileIndex) => (
								<div className={meldTileContainerClassName} key={tileIndex}>
									<Tile
										suit={suit}
										type={type}
										className={tileContentClassName}
									/>
								</div>
							))}
					</div>
				))}
		</>
	);

	const renderConcealedKongs = () => (
		<>
			{numOfConcealedKongs > 0 &&
				concealedKongs.map((kong, kongIndex) => (
					<div
						className={
							meldContainerClassName +
							(kongIndex === numOfConcealedKongs - 1
								? ` meld-container-${direction}-last`
								: '')
						}
						key={kongIndex}
					>
						{kong.length > 0 &&
							kong.map(({ suit, type }, tileIndex) => {
								if (tileIndex === 0 || tileIndex === 3) {
									return <HiddenTile key={tileIndex} position={position} />;
								}
								return (
									<div className={meldTileContainerClassName} key={tileIndex}>
										<Tile
											suit={suit}
											type={type}
											className={tileContentClassName}
										/>
									</div>
								);
							})}
					</div>
				))}
		</>
	);

	return (
		<div className={`melds-container-${direction}`}>
			{renderMelds()}
			{renderConcealedKongs()}
			{children}
		</div>
	);
};
