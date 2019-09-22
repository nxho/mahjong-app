import { combineReducers } from 'redux';
import opponents from './opponents';
import player from './player';
import messages from './messages';

export default combineReducers({
	opponents,
	player,
	messages,
});

