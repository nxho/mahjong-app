import React, { Component } from 'react';
import './TileContent.css'

class TileContent extends Component {
	tryRequire() {
		let img = null;

		try {
			img = require(`../images/tiles/${this.props.suit.slice(0, 4)}_${this.props.type}.png`)
		} catch (e) {
			// handle silently
		}

		return img;
	}

	renderImg(img_src) {
		return (
			<img
				className='imgTile'
				src={img_src}
				alt={`${this.props.suit}_${this.props.type}`}
			/>
		);
	}

	renderText() {
		return (
			<div className='textTileDiv'>
				<div>{this.props.suit.slice(0, 4)}</div>
				<div>{this.props.type}</div>
			</div>
		);
	}

	render() {
		let img_src = this.tryRequire();
		if (img_src) {
			return this.renderImg(img_src);
		} else {
			return this.renderText();
		}
	}
}

export default TileContent;

