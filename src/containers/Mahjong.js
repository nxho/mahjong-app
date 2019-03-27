import React, { Component } from 'react';
import Player from './Player';

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
		for (let player of currentPlayerState) {
			for (let i = 0; i < 14; i++) {
				while(true) {
					const randIndex = Math.floor((Math.random() * 1000) % 144);
					if (currentTileState.has(randIndex)) {
						player.tiles.push(currentTileState.get(randIndex));
						currentTileState.delete(randIndex);
						break;
					}
				}
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
				{ name: 'Player 1', tiles: [] },
				{ name: 'Player 2', tiles: [] },
				{ name: 'Player 3', tiles: [] },
				{ name: 'Player 4', tiles: [] }
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
				suit: 'dot',
				types: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				count: 4,
			},
			{
				suit: 'bamboo',
				types: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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

		const tiles = new Map()

		let count = 0
		for (let set of [...honor, ...numeric, ...bonus]) {
			for (let i = 0; i < set.count; i++) {
				for (let type of set.types) {
					tiles.set(count, {
						suit: set.suit,
						type: type,
					});

					count++;
				}
			}
		}

		this.setState({
			tiles: tiles
		});
	}

	render() {
		return (
			<div>
				<p>{this.state.tiles.size} available tiles</p>
				{ this.state.players.map((item, index) => <Player key={index} name={item.name} tiles={item.tiles} />) }
			</div>
		);
	}
}

