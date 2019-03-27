import React, { Component } from 'react';
import Tile from './Tile';
import './TileRack.css';

export default class TileRack extends Component {
	render() {
		const valid = new Set(['row', 'column']);
		const direction = valid.has(this.props.direction) ? this.props.direction : '';
		return (
			<div className={'tileRackDiv ' + direction}>
				{ this.props.tiles.map((item, index) => <Tile key={index} suit={item.suit} type={item.type} />) }
			</div>
		);
	}
}


