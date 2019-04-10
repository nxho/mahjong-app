import React, { Component } from 'react';
import { connect } from 'react-redux';
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

/*
const mapStateToProps = state => ({
	tiles: state.tiles,
});

export default connect(
	mapStateToProps,
	null,
)(TileRack);
*/

