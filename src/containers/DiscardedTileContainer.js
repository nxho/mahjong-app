import React, { Component } from 'react';
import TileContent from './TileContent';
import './DiscardedTileContainer.css';

class DiscardedTileContainer extends Component {
	render() {
		const tileProps = this.props.tileProps;
		return (
			<div className='containerDiv'>
				<p>Last Discarded Tile</p>
				{
					tileProps &&
						<TileContent
							suit={tileProps.suit}
							type={tileProps.type}
						/>
				}
			</div>
		);
	}
}

export default DiscardedTileContainer;

