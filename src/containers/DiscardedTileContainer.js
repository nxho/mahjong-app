import React, { Component } from 'react';
import TileContent from './TileContent';
import './DiscardedTileContainer.css';

class DiscardedTileContainer extends Component {
	render() {
		const tileProps = this.props.tileProps;
		return (
			<div className='discarded-tile-container'>
				<p>Last Discarded Tile</p>
				<div className='tile-container'>
					{
						tileProps &&
							<TileContent
								suit={tileProps.suit}
								type={tileProps.type}
							/>
					}
				</div>
			</div>
		);
	}
}

export default DiscardedTileContainer;

