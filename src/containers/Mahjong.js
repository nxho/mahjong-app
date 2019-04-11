import React, { Component } from 'react';
import Player from './Player';
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

export default class Mahjong extends Component {
	constructor(props) {
		super(props);

		this.state = {
			players: [],
			tiles: {},
		}
	}

	async componentDidMount() {
		await this.initializeTiles();
		await this.initializeRandomPlayers();
		this.dealRandomTiles();
	}

	dealRandomTiles() {
		const currentPlayerState = this.state.players;
		const currentTileState = this.state.tiles;
		let currentTileIndex = this.state.tiles.length - 1;
		for (let player of currentPlayerState) {
			for (let i = 0; i < 14; i++) {
				const randIndex = Math.floor((Math.random() * 1000) % (currentTileIndex + 1));
				if (randIndex != currentTileIndex) {
					const temp = currentTileState[currentTileIndex];
					currentTileState[currentTileIndex] = currentTileState[randIndex];
					currentTileState[randIndex] = temp;
				}
				player.tiles.push(currentTileState.pop());
				currentTileIndex--;
			}
		}

		this.setState({
			players: currentPlayerState,
			tiles: currentTileState,
		});
	}

	initializeRandomPlayers() {
		this.setState({
			players: [
				{
					name: 'Player 1',
					tiles: [],
					tileRotation: 0,
					direction: 'row'
				},
				{
					name: 'Player 2',
					tiles: [],
					tileRotation: .75,
					direction: 'column'
				},
				{
					name: 'Player 3',
					tiles: [],
					tileRotation: .25,
					direction: 'column'
				},
				{
					name: 'Player 4',
					tiles: [],
					tileRotation: .5,
					direction: 'row'
				}
			],
		});
	}

	initializeTiles() {
		const honor = [
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
		const numeric = [
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
				count: 4,
			},
		];
		const bonus = [
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

		const tiles = [];

		let count = 0
		for (let set of [...honor, ...numeric, ...bonus]) {
			for (let i = 0; i < set.count; i++) {
				for (let type of set.types) {
					tiles[count] = {
						suit: set.suit,
						type: type,
						img: set.imgs != null ? set.imgs[type - 1] : null,
					};

					count++;
				}
			}
		}

		this.setState({
			tiles: tiles
		});
	}

	renderPlayer(player) {
		return <Player
			name={player.name}
			tiles={player.tiles}
			tileRotation={player.tileRotation}
			direction={player.direction}
		/>;
	}

	render() {
		return (
			<div>
				{
					this.state.players.length > 0 && (
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
							<div>
								{ this.renderPlayer(this.state.players[2]) }
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
								{ this.renderPlayer(this.state.players[3]) }
								{ this.renderPlayer(this.state.players[0]) }
							</div>
							<div>
								{ this.renderPlayer(this.state.players[1]) }
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

