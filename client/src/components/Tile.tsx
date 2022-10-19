import React from 'react';
import './Tile.css';

type Props = {
	suit: string;
	type: string;
	selected?: boolean;
	className?: string;
};

export const Tile = ({ suit, type, selected, className }: Props) => {
	let localClassName = 'imgTile';
	if (className) {
		localClassName += ` ${className}`;
	}
	if (selected) {
		localClassName += ' imgTile--state-selected';
	}

	const imgSrc = `${process.env.PUBLIC_URL}/assets/images/${suit}_${type}.svg`;

	return (
		<img
			className={localClassName}
			src={imgSrc}
			alt={`${suit}_${type}`}
			draggable="false"
		/>
	);
};
