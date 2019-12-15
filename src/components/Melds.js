import React from 'react';
import Tile from './Tile';

import './Melds.css';

const Melds = ({ melds, children, direction, tileRotation }) => {
	let tileContentClassName = '';
	let meldContainerClassName = `meld-container-${direction}`;
	let meldTileContainerClassName = 'meld-tile-container';
	if (!!tileRotation && tileRotation !== 'none') {
		tileContentClassName = `img--rotated-${tileRotation}`;
		meldContainerClassName += ` meld-container-${tileRotation}`;
		meldTileContainerClassName += ` meld-tile-container-${tileRotation}`;
	}

	return (
		<div className={`melds-container-${direction}`}>
			{ !!melds && melds.length > 0
				&& melds.map((meld, meldIndex) => (
				<div className={meldContainerClassName} key={meldIndex}>
					{ meld.length > 0 && meld.map(({ suit, type }, tileIndex) => (
						<div className={meldTileContainerClassName} key={tileIndex}>
							<Tile
								suit={suit}
								type={type}
								className={tileContentClassName}
							/>
						</div>
					)) }
				</div>
			)) }
			{ children }
		</div>
	);
};

export default Melds;

