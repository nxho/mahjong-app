import React from 'react';
import { connect } from 'react-redux';
import TileContent from './TileContent';
import NewMeld from './NewMeld';

import './Melds.css';

const Melds = ({ revealedMelds, currentState }) => {
	console.log(`Rendering <Melds /> with revealedMelds=${revealedMelds} and currentState=${currentState}`);

	return (
		<div className='melds-container-row'>
			{ revealedMelds.map((meld, meldIndex) => (
				<div className='meld-container' key={meldIndex}>
					{ meld.map(({ suit, type }, tileIndex) => (
						<div className='meld-tile-container' key={tileIndex}>
							<TileContent
								suit={suit}
								type={type}
							/>
						</div>
					)) }
				</div>
			)) }
			{ currentState === 'REVEAL_MELD' && <NewMeld /> }
		</div>
	);
};

const mapStateToProps = state => ({
	revealedMelds: state.player.revealedMelds,
	currentState: state.player.currentState,
});

export default connect(
	mapStateToProps,
	null
)(Melds);

