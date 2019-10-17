import React, { Component } from 'react';
import PlayerTile from './PlayerTile';
import './TileRack.css';

class TileRack extends Component {
	render() {
		const valid = new Set(['row', 'column']);
		const direction = valid.has(this.props.direction) ? this.props.direction : '';
		return (
			<div className={'tileRackDiv ' + direction}>
				{
					this.props.tiles.map((item, index) => (
						<PlayerTile
							key={index}
							index={index}
							suit={item.suit}
							type={item.type}
							img={item.img}
							tileRotation={this.props.tileRotation}
							dragEnabled={this.props.tileDragEnabled}
						/>
					))
				}
			</div>
		);
	}
}

export default TileRack;

