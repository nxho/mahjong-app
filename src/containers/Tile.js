import React, { Component } from 'react';
import { connect } from 'react-redux';
import { swapTile } from '../actions';
import './Tile.css'

class Tile extends Component {
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
				src={img_src}
				alt={`${this.props.suit}_${this.props.type}`}
				style={{
					maxWidth: 51.5,
				}}
			/>
		);
	}

	renderText() {
		return (
			<div
				className='tileDiv'
				style={{
					padding: 5,
					width: 40,
					height: 60.98,
				}}
			>
				<div>{this.props.suit.slice(0, 4)}</div>
				<div>{this.props.type}</div>
			</div>
		);
	}

	render() {
		let img_src = this.tryRequire();
		return (
			<div
				style={{
					margin: 5,
					transform: `rotate(${this.props.tileRotation}turn)`,
				}}
				draggable='true'
				onDragStart={(e) => {
					e.dataTransfer.setData('src_index', this.props.index);
				}}
				onDragEnter={(e) => e.preventDefault()}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					this.props.swapTile(this.props.playerId, parseInt(e.dataTransfer.getData('src_index')), this.props.index);
				}}
			>
				{
					(img_src && this.renderImg(img_src)) || this.renderText()
				}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	swapTile: (playerId, src_index, dst_index) => dispatch(swapTile(playerId, src_index, dst_index)),
});

export default connect(
	null,
	mapDispatchToProps,
)(Tile);

