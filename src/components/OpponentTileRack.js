import React from 'react';
import BlankTile from './BlankTile';
import TileContent from '../containers/TileContent';
import './OpponentTileRack.css';

const OpponentTileRack = ({ revealedMelds, tileCount, position }) => {
	let tiles = [];
	for (let i = 0; i < tileCount; i++) {
		tiles.push(
			<BlankTile
				key={i}
				position={position}
			/>
		);
	}

	let rotation = '180';
	if (position === 'left') {
		rotation = 'cw'
	} else if (position === 'right') {
		rotation = 'ccw'
	}

	// TODO: using same class names from Melds.js, should probably fix
	return (
		<div className={`blank-tile-rack blank-${position}`}>
			{tiles}
			<div className={`melds-container-row melds-container-${position}`}>
				{ revealedMelds.map((meld, meldIndex) => (
					<div className={`meld-container melds-container-${position}`} key={meldIndex}>
						{ meld.map(({ suit, type }, tileIndex) => (
							<div className={`meld-tile-container meld-tile-container-${position}`} key={tileIndex}>
								<TileContent
									suit={suit}
									type={type}
									className={`img--rotated-${rotation}`}
								/>
							</div>
						)) }
					</div>
				)) }
			</div>
		</div>
	);
};

export default OpponentTileRack;

