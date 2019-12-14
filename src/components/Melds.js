import React from 'react';
import TileContent from '../containers/TileContent';

import './Melds.css';

const Melds = ({ melds, children, direction, tileRotation }) => {
	let tileClassName = '';
	if (!!tileRotation && tileRotation !== 'none') {
		tileClassName = `img--rotated-${tileRotation}`;
	}

	return (
		<div className={`melds-container melds-container-${direction}`}>
			{ melds.map((meld, meldIndex) => (
				<div className='meld-container' key={meldIndex}>
					{ meld.map(({ suit, type }, tileIndex) => (
						<div className={`meld-tile-container-${direction}`} key={tileIndex}>
							<TileContent
								suit={suit}
								type={type}
								className={tileClassName}
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

