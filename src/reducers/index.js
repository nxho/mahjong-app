import { combineReducers } from 'redux';
import opponents from './opponents';
import player from './player';
import socket from './socket';

export default combineReducers({
	opponents,
	player,
	socket,
});

