export type Tile = HonorTile | NumericTile;

type HonorTile = DragonTile | WindTile;
type DragonTile = {
	suit: 'dragon';
	type: 'red' | 'green' | 'white';
};

type WindTile = {
	suit: 'wind';
	type: 'north' | 'south' | 'east' | 'west';
};

type NumericTile = DotsTile | BambooTile | CharacterTile;
type DotsTile = {
	suit: 'dots';
	type: Range1To9;
};

type BambooTile = {
	suit: 'bamboo';
	type: Range1To9;
};

type CharacterTile = {
	suit: 'character';
	type: Range1To9;
};

type Range1To9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// type Honor = 'wind' | 'dragon';
// type Numeric = 'dots' | 'bamboo' | 'character';
// type Bonus = 'flower' | 'season';

type Hand = {
	honCountMap: Map<string, number>;
	numCountMap: Map<string, number>;
};

const honor = ['dragon', 'wind'];
const numeric = ['dots', 'bamboo', 'character'];

export const isWinningHand = (tiles: Tile[]): boolean => {
	const hand: Hand = convertTilesToHand(tiles);

	console.log('hand', hand);

	return false;
};

const convertTilesToHand = (tiles: Tile[]): Hand => {
	return tiles.reduce(
		(acc, tile) => {
			if (honor.includes(tile.suit)) {
				const count = acc.honCountMap.get(tile.suit) ?? 0;
				acc.honCountMap.set(tile.suit, count + 1);
			} else if (numeric.includes(tile.suit)) {
				const count = acc.numCountMap.get(tile.suit) ?? 0;
				acc.numCountMap.set(tile.suit, count + 1);
			} else {
				throw Error(`Unexpected tile=${tile}`);
			}
			return acc;
		},
		{
			honCountMap: new Map(),
			numCountMap: new Map(),
		} as Hand,
	);
};
