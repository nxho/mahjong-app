import React from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Opponent from '../components/Opponent';
import DiscardedTileContainer from '../components/DiscardedTileContainer';
import Overlay from './Overlay';

import './Board.css';

const Board = ({ opponents, discardedTile, pastDiscardedTiles, isGameOver }) => {
	console.log('Re-rendering Board container')
	const renderOpponent = (id, position) => {
		const { name, revealedMelds, concealedKongs, tileCount } = opponents[id];
		return <Opponent
			name={name}
			revealedMelds={revealedMelds}
			concealedKongs={concealedKongs}
			tileCount={tileCount}
			position={position}
		/>;
	};

	return (
		<div className='boardContainer' data-testid='board'>
			<div className='leftColumn'>
				{ renderOpponent(2, 'left') }
			</div>
			<div className='middleColumn'>
				{ renderOpponent(1, 'top') }
				<DiscardedTileContainer discardedTile={discardedTile} pastDiscardedTiles={pastDiscardedTiles} />
				<Player />
			</div>
			<div className='rightColumn'>
				{ renderOpponent(0, 'right') }
			</div>
			{ isGameOver && <Overlay /> }
		</div>
	)
};

const mapStateToProps = state => ({
	discardedTile: state.player.discardedTile,
	pastDiscardedTiles: state.player.pastDiscardedTiles,
	isGameOver: state.player.isGameOver,
	opponents: state.opponents,
});

export default connect(
	mapStateToProps,
	null,
)(Board);

