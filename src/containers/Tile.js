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
					maxWidth: 60,
					maxHeight: 60,
					transform: `rotate(${this.props.tileRotation}turn)`,
					transformOrigin: 'center',
				}}
			/>
		);
	}
	renderText() {
		return (
			<div
				className='tileDiv'
				style={{ transform: `rotate(${this.props.tileRotation}turn)` }}
			>
				<div>{this.props.suit.slice(0, 4)}</div>
				<div>{this.props.type}</div>
			</div>
		);
	}
	render() {
		return (
			<div
				draggable='true'
				onDragStart={(e) => {
					e.dataTransfer.setData('src_index', this.props.index);
				}}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					this.props.swapTile(e.dataTransfer.getData('src_index'), this.props.index);
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
	swapTile: (src_index, dst_index) => dispatch(swapTile(src_index, dst_index)),
});

export default connect(
	null,
	mapDispatchToProps,
)(Tile);

