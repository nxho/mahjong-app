import React from 'react';

import './HiddenTile.css';

type Props = {
	position: string;
};

export const HiddenTile = ({ position }: Props) => (
	<div className={`div__hidden-tile div__hidden-tile--${position}`}>
		<div className="div__hidden-tile--back-color"></div>
	</div>
);
