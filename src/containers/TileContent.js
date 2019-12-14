import React from 'react';
import './TileContent.css'

// TODO: move to components folder?
const TileContent = ({ suit, type, selected, className }) => {
	const tryRequire = () => {
		let img = null;

		try {
			// TODO: maybe we should just rename the images as the full suit+type name
			img = require(`../images/tiles/${suit.slice(0, 4)}_${type}.png`)
		} catch (e) {
			// handle silently
		}

		return img;
	};

	const renderImg = (img_src) => {
		let localClassName = 'imgTile';
		if (!!className) {
			localClassName += ` ${className}`;
		}
		if (selected) {
			localClassName += ' imgTile--state-selected';
		}
		return (
			<img
				className={localClassName}
				src={img_src}
				alt={`${suit}_${type}`}
			/>
		);
	};

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

