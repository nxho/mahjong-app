import { honor, numeric, bonus } from './tile_groups';

const initPlayers = () => {
	console.log('Initializing players');

	return {
		byId: {
			'1': {
				name: 'Player 1',
				tileRotation: 0,
				direction: 'row'
			},
			'2': {
				name: 'Player 2',
				tileRotation: .75,
				direction: 'column'
			},
			'3': {
				name: 'Player 3',
				tileRotation: .25,
				direction: 'column'
			},
			'4': {
				name: 'Player 4',
				tileRotation: .5,
				direction: 'row'
			}
		},
		allIds: ['1', '2', '3', '4']
	};
}

const initTiles = (playerIds) => {
	console.log('Initializing game tiles');

	const gameTiles = [];

	/*
	 *  Tile data structure:
	 *  {
	 *  	suit: 'char',
	 *  	type: 1,
	 *  	img: <img object>
	 *  }
	 */
	for (let set of [...honor, ...numeric, ...bonus]) {
		for (let i = 0; i < set.count; i++) {
			for (let type of set.types) {
				gameTiles.push({
					suit: set.suit,
					type: type,
					img: set.imgs != null ? set.imgs[type - 1] : null,
				});
			}
		}
	}

	/*
	 * 	Tiles data structure:
	 * 	{
	 * 		byId: {
	 * 			game: [],
	 * 			1: [],
	 * 			2: [],
	 * 			...
	 * 		}
	 *  }
	 */
	let tiles = {byId: {}};

	tiles.byId['game'] = gameTiles;
	for (let id of playerIds) {
		tiles.byId[id] = [];
	}

	return tiles;
}

const initPlayersAndTiles = () => {
	const players = initPlayers();
	const tiles = initTiles(players.allIds);

	return {
		players,
		tiles 
	};
}

export default initPlayersAndTiles;

