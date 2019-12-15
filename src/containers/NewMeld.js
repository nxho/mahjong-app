import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tile from '../components/Tile';
import { completeNewMeld } from '../actions';

const NewMeld = ({ newMeld, newMeldTargetLength, completeNewMeld }) => {
	console.log('Rendering <NewMeld /> with newMeld', newMeld, 'and newMeldTargetLength', newMeldTargetLength);

	useEffect(() => {
		if (newMeld.length > 0 && newMeld.length === newMeldTargetLength) {
			completeNewMeld(newMeld);
		}
	});

	return (
		// FIXME: this is using styling from src/components/Melds.css, consolidate or something
		<div className='meld-container-row'>
			{ newMeld.map(({ suit, type }, tileIndex) => (
				<div className='meld-tile-container' key={tileIndex}>
					<Tile suit={suit} type={type} />
				</div>
			)) }
		</div>
	);
};

const mapStateToProps = state => ({
	newMeld: state.player.newMeld,
	newMeldTargetLength: state.player.newMeldTargetLength,
});

const mapDispatchToProps = dispatch => ({
	completeNewMeld: (newMeld) => dispatch(completeNewMeld(newMeld)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewMeld);

