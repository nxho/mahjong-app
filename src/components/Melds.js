import React from 'react';
import TileContent from '../containers/TileContent';

import './Melds.css';

const Melds = ({ melds, children, direction, tileRotation }) => {
	let tileContentClassName = '';
	let meldTileContainerClassName = 'meld-tile-container';
	if (!!tileRotation && tileRotation !== 'none') {
		tileContentClassName = `img--rotated-${tileRotation}`;
		meldTileContainerClassName += ` meld-tile-container-${tileRotation}`;
	}

	return (
		<div className={`melds-container-${direction}`}>
			{ !!melds && melds.length > 0
				&& melds.map((meld, meldIndex) => (
				<div className={`meld-container-${direction}`} key={meldIndex}>
					{ meld.length > 0 && meld.map(({ suit, type }, tileIndex) => (
						<div className={meldTileContainerClassName} key={tileIndex}>
							<TileContent
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

