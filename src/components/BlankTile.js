import React from 'react';

import './BlankTile.css';

const BlankTile = ({position}) => (
	<div className={`div__blank-tile div__blank-tile--${position}`}></div>
);

export default BlankTile;

