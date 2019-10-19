import React, { Component } from 'react';
import { connect } from 'react-redux';
import { swapTile, selectTile } from '../actions';
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
		const selected = this.props.index === this.props.selectedTileIndex;
		return (
			<div
				className={selected ? ' selected' : 'tileDiv'}
				style={{
					transform: `rotate(${this.props.tileRotation}turn)`,
				}}
				draggable={`${this.props.dragEnabled}`}
				onDragStart={this.props.dragEnabled ? this.handleDragStart : this.handleEventPreventDefault}
				onDragEnter={this.handleEventPreventDefault}
				onDragOver={this.handleEventPreventDefault}
				onDrop={this.props.dragEnabled ? this.handleDrop : this.handleEventPreventDefault}
				onMouseUp={() => this.props.selectTile(this.props.index)}
			>
				<TileContent
					suit={this.props.suit}
					type={this.props.type}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedTileIndex: state.player.selectedTileIndex,
});

const mapDispatchToProps = dispatch => ({
	swapTile: (playerId, src_index, dst_index) => dispatch(swapTile(playerId, src_index, dst_index)),
	selectTile: (index) => dispatch(selectTile(index)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PlayerTile);

