import React, { Component } from 'react';
import './Tile.css'

export default class Tile extends Component {
	render() {
		return (
			<div className='tileDiv'>
				<div>{this.props.suit.slice(0, 4)}</div>
				<div>{this.props.type}</div>
			</div>
		);
	}
}

