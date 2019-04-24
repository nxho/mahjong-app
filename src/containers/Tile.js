import React, { Component } from 'react';
import { connect } from 'react-redux';
import { swapTile } from '../actions';
import './Tile.css'

class Tile extends Component {
	renderImg() {
		return (
			<img
				src={this.props.img}
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
					height: 62.48,
				}}
			>
				<div>{this.props.suit.slice(0, 4)}</div>
				<div>{this.props.type}</div>
			</div>
		);
	}
	render() {
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
					(this.props.img != null && this.renderImg()) || this.renderText()
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

