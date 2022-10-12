import React from 'react';
import { Tile } from './Tile';
import { v4 } from 'uuid';

import './DiscardedTileContainer.css';
import { Tile as TileType } from '../types';

type Props = {
	discardedTile: TileType;
	pastDiscardedTiles: TileType[];
};

export const DiscardedTileContainer = ({
	discardedTile,
	pastDiscardedTiles,
}: Props) => (
	<div className="discarded-tile-container">
		{!!pastDiscardedTiles &&
			pastDiscardedTiles.map((tile) => (
				<div className="discarded-tile-container__tile" key={v4()}>
					<Tile suit={tile.suit} type={tile.type} />
				</div>
			))}
		{!!discardedTile && (
			<div className="discarded-tile-container__tile" key={v4()}>
				<Tile suit={discardedTile.suit} type={discardedTile.type} />
			</div>
		)}
	</div>
);
