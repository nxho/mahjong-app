import { combineReducers } from 'redux';
import opponents, { Opponent } from './opponents';
import player, { Player } from './player';
import messages, { Message } from './messages';

export type MahjongState = {
	opponents: Opponent[];
	player: Player;
	messages: Message[];
};

export default combineReducers<MahjongState>({
	opponents,
	player,
	messages,
});
