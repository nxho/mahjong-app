import React from 'react';

const styles = {
	container: {
		borderWidth: .75,
		borderStyle: 'solid',
		borderColor: 'black',
	},
	row: {
		width: 40,
		height: 62.48,
	},
	column: {
		width: 62.48,
		height: 40,
	},
};

const BlankTile = ({direction}) => (
	<div style={[styles.container, styles[direction]]}>
	</div>
);

export default BlankTile;

