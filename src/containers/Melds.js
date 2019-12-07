import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TileContent from './TileContent';
import { finalizeRevealedMelds } from '../actions';

import './Melds.css';

const Melds = ({
	revealedMelds,
	currentState,
	newMeldLength,
	finalizeRevealedMelds,
}) => {
	console.log('Rendering <Melds /> with revealedMelds:', revealedMelds);
	useEffect(() => {
		// TODO: further split this component up into solidifed melds, and the current meld the player is trying to declare?
		// can conditionally show the "CurrentMeld" component only when the currentState is === 'REVEAL_MELD', otherwise just show the Melds component? that way we don't render the whole list of melds multiple times? I think that sounds right actually. But we can stick with this for now since this is now rendering only once per update of revealedMelds lol.
		const isMeldComplete = revealedMelds.length > 0 && (revealedMelds[revealedMelds.length - 1].length === newMeldLength);
		if (currentState === 'REVEAL_MELD' && isMeldComplete) {
			console.log('heyhey-inside');
			finalizeRevealedMelds(revealedMelds);
		}
	});

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
		</div>
	);
};

const mapStateToProps = state => ({
	revealedMelds: state.player.revealedMelds,
	newMeldLength: state.player.newMeldLength,
	currentState: state.player.currentState,
});

const mapDispatchToProps = dispatch => ({
	finalizeRevealedMelds: (revealedMelds) => dispatch(finalizeRevealedMelds(revealedMelds)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Melds);

