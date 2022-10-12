import React from 'react';
import './Tile.css';

type Props = {
	suit: string;
	type: string;
	selected?: boolean;
	className?: string;
};

export const Tile = ({ suit, type, selected, className }: Props) => {
	const tryRequire = () => {
		let img = null;

		try {
			img = require(`../svgs/${suit}_${type}.svg`);
		} catch (e) {
			// handle silently
		}

		return img;
	};

	const renderImg = (img_src: string) => {
		let localClassName = 'imgTile';
		if (className) {
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
				draggable="false"
			/>
		);
	};

	const renderText = () => (
		<div className="textTileDiv">
			<div>{suit.slice(0, 4)}</div>
			<div>{type}</div>
		</div>
	);

	const img_src = tryRequire();
	if (img_src) {
		return renderImg(img_src);
	} else {
		return renderText();
	}
};
