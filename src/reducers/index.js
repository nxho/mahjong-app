import { combineReducers } from 'redux';
import tiles from './tiles';
import opponents from './opponents';
import player from './player';
import socket from './socket';

export default combineReducers({
	tiles,
	opponents,
	player,
	socket,
});

