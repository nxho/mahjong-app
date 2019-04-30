import React from 'react';

const styles = {
	container: {
		margin: 5,
		borderWidth: .75,
		borderStyle: 'solid',
		borderColor: 'black',
	},
	row: {
		width: 50.75,
		height: 71.73,
	},
	column: {
		width: 71.73,
		height: 50.75,
	},
};

const BlankTile = ({direction}) => (
	<div style={{...styles.container, ...styles[direction]}}>
	</div>
);

export default BlankTile;

