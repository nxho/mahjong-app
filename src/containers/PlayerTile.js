import React, { Component } from 'react';
import { connect } from 'react-redux';
import { swapTile } from '../actions';
import TileContent from './TileContent';
import './PlayerTile.css'

class PlayerTile extends Component {
	handleEventPreventDefault = (e) => {
		e.preventDefault()
	}

	handleDragStart = (e) => {
		e.dataTransfer.setData('src_index', this.props.index);
	}

	handleDrop = (e) => {
		this.props.swapTile(parseInt(e.dataTransfer.getData('src_index')), this.props.index);
	}

	render() {
		return (
			<div
				className='tileDiv'
				style={{
					transform: `rotate(${this.props.tileRotation}turn)`,
				}}
				draggable={`${this.props.dragEnabled}`}
				onDragStart={this.props.dragEnabled ? this.handleDragStart : this.handleEventPreventDefault}
				onDragEnter={this.handleEventPreventDefault}
				onDragOver={this.handleEventPreventDefault}
				onDrop={this.props.dragEnabled ? this.handleDrop : this.handleEventPreventDefault}
			>
				<TileContent
					suit={this.props.suit}
					type={this.props.type}
				/>
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
)(PlayerTile);

