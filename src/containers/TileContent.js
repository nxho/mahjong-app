import React from 'react';
import './TileContent.css'

const TileContent = ({ suit, type }) => {
	const tryRequire = () => {
		let img = null;

		try {
			img = require(`../images/tiles/${suit.slice(0, 4)}_${type}.png`)
		} catch (e) {
			// handle silently
		}

		return img;
	};

	const renderImg = (img_src) => (
		<img
			className='imgTile'
			src={img_src}
			alt={`${suit}_${type}`}
		/>
	);

	const renderText = () => (
		<div className='textTileDiv'>
			<div>{suit.slice(0, 4)}</div>
			<div>{type}</div>
		</div>
	);

	let img_src = tryRequire();
	if (img_src) {
		return renderImg(img_src);
	} else {
		return renderText();
	}
};

export default TileContent;

