import d1 from '../images/tiles/dots_1.png';
import d2 from '../images/tiles/dots_2.png';
import d3 from '../images/tiles/dots_3.png';
import d4 from '../images/tiles/dots_4.png';
import d5 from '../images/tiles/dots_5.png';
import d6 from '../images/tiles/dots_6.png';
import d7 from '../images/tiles/dots_7.png';
import d8 from '../images/tiles/dots_8.png';
import d9 from '../images/tiles/dots_9.png';

// import b1 from '../images/tiles/bamb_1.png';
import b2 from '../images/tiles/bamb_2.png';
import b3 from '../images/tiles/bamb_3.png';
import b4 from '../images/tiles/bamb_4.png';
import b5 from '../images/tiles/bamb_5.png';
import b6 from '../images/tiles/bamb_6.png';
import b7 from '../images/tiles/bamb_7.png';
import b8 from '../images/tiles/bamb_8.png';
import b9 from '../images/tiles/bamb_9.png';

import c1 from '../images/tiles/char_1.png';
import c2 from '../images/tiles/char_2.png';
import c3 from '../images/tiles/char_3.png';
// import c4 from '../images/tiles/char_4.png';
// import c5 from '../images/tiles/char_5.png';
// import c6 from '../images/tiles/char_6.png';
// import c7 from '../images/tiles/char_7.png';
// import c8 from '../images/tiles/char_8.png';
// import c9 from '../images/tiles/char_9.png';

export const honor = [
	{
		suit: 'wind',
		types: ['north', 'south', 'east', 'west'],
		count: 4,
	},
	{
		suit: 'dragon',
		types: ['red', 'green', 'white'],
		count: 4,
	},
];

export const numeric = [
	{
		suit: 'dots',
		types: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		imgs: [d1, d2, d3, d4, d5, d6, d7, d8, d9],
		count: 4,
	},
	{
		suit: 'bamboo',
		types: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		imgs: [/*b1, */b2, b3, b4, b5, b6, b7, b8, b9],
		count: 4,
	},
	{
		suit: 'character',
		types: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		imgs: [c1, c2, c3, /*c4, c5, c6, c7, c8, c9*/],
		count: 4,
	},
];

export const bonus = [
	{
		suit: 'flower',
		types: [1, 2, 3, 4],
		count: 1,
	},
	{
		suit: 'season',
		types: [1, 2, 3, 4],
		count: 1,
	},
];

