import { isWinningHand, Tile } from './is_winning_hand';

const pung: Tile[] = [
	{
		suit: 'bamboo',
		type: 1,
	},
	{
		suit: 'bamboo',
		type: 1,
	},
	{
		suit: 'bamboo',
		type: 1,
	},
];

const pung2: Tile[] = [
	{
		suit: 'dragon',
		type: 'red',
	},
	{
		suit: 'dragon',
		type: 'red',
	},
	{
		suit: 'dragon',
		type: 'red',
	},
];

describe('isWinningHand', () => {
	it('win conditions', () => {
		expect(isWinningHand(pung2)).toBe(true);
	});
});
