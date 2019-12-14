import React from 'react';
import { connect } from 'react-redux';
import NewMeld from './NewMeld';
import Melds from '../components/Melds';

const PlayerMelds = ({ revealedMelds, currentState }) => {
	console.log(`Rendering <PlayerMelds /> with revealedMelds=${revealedMelds} and currentState=${currentState}`);

	return (
		<Melds
			melds={revealedMelds}
			direction='row'
		>
			{ currentState === 'REVEAL_MELD' && <NewMeld /> }
		</Melds>
	);
};

const mapStateToProps = state => ({
	revealedMelds: state.player.revealedMelds,
	currentState: state.player.currentState,
});

export default connect(
	mapStateToProps,
	null
)(PlayerMelds);

