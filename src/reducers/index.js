import { combineReducers } from 'redux';
import tiles from './tiles';
import players from './players';
import socket from './socket';

export default combineReducers({
	tiles,
	players,
	socket,
});

