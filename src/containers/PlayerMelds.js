import React from 'react';
import { connect } from 'react-redux';
import NewMeld from './NewMeld';
import Melds from '../components/Melds';

const PlayerMelds = ({ revealedMelds, concealedKongs, currentState }) => {
	console.log('Rendering <PlayerMelds /> with revealedMelds:', revealedMelds, 'concealedKongs:', concealedKongs, 'currentState:', currentState);

	return (
		<Melds
			melds={revealedMelds}
			concealedKongs={concealedKongs}
			position='bottom'
			direction='row'
		>
			{ currentState === 'REVEAL_MELD' && <NewMeld /> }
		</Melds>
	);
};

const mapStateToProps = state => ({
	revealedMelds: state.player.revealedMelds,
	concealedKongs: state.player.concealedKongs,
	currentState: state.player.currentState,
});

export default connect(
	mapStateToProps,
	null
)(PlayerMelds);

