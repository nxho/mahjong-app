import React, { Component } from 'react';
import Tile from './Tile';
import './TileRack.css';

export default class TileRack extends Component {
	render() {
		const valid = new Set(['row', 'column']);
		const direction = valid.has(this.props.direction) ? this.props.direction : '';
		return (
			<div className={'tileRackDiv ' + direction}>
				{
					this.props.tiles.map((item, index) => (
						<Tile
							playerId={this.props.playerId}
							key={index}
							index={index}
							suit={item.suit}
							type={item.type}
							img={item.img}
							tileRotation={this.props.tileRotation}
						/>
					))
				}
			</div>
		);
	}
}

