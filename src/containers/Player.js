import React, { Component } from 'react';
import TileRack from './TileRack';

export default class Player extends Component {
	render() {
		return (
			<div>
				<h3>{this.props.name}</h3>
				<TileRack
					playerId={this.props.id}
					tiles={this.props.tiles}
					direction={this.props.direction}
					tileRotation={this.props.tileRotation}
				/>
			</div>
		);
	}
}

