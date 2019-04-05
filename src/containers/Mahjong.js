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

	renderPlayer(player) {
			return <Player name={player.name} tiles={player.tiles} tileRotation={player.tileRotation} direction={player.direction} />;
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

