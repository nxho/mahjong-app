import React from 'react';

import './HiddenTile.css';

const HiddenTile = ({position}) => (
	<div className={`div__hidden-tile div__hidden-tile--${position}`}></div>
);

export default HiddenTile;

