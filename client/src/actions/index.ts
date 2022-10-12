import { Message } from "../reducers/messages";

export const JOIN_GAME = 'JOIN_GAME';
export const REJOIN_GAME = 'REJOIN_GAME';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const UPDATE_CURRENT_STATE = 'UPDATE_CURRENT_STATE';
export const UPDATE_ROOM_ID = 'UPDATE_ROOM_ID';
export const UPDATE_OPPONENTS = 'UPDATE_OPPONENTS';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export const END_TURN = 'END_TURN';

export const EXTEND_TILES = 'EXTEND_TILES';
export const DRAW_TILE = 'DRAW_TILE';
export const UPDATE_TILES = 'UPDATE_TILES';
export const MOVE_TILE = 'MOVE_TILE';
export const SELECT_TILE = 'SELECT_TILE';
export const UPDATE_DISCARDED_TILE = 'UPDATE_DISCARDED_TILE';
export const CLAIM_TILE = 'CLAIM_TILE';
export const PRE_REVEAL_MELD = 'PRE_REVEAL_MELD';
export const SET_REVEALED_MELDS = 'SET_REVEALED_MELDS';
export const RECEIVE_PENDING_EVENTS = 'RECEIVE_PENDING_EVENTS';
export const SHOW_MELDABLE_TILES = 'SHOW_MELDABLE_TILES';
export const EXTEND_NEW_MELD = 'EXTEND_NEW_MELD';
export const COMPLETE_NEW_MELD = 'COMPLETE_NEW_MELD';
export const UPDATE_CAN_DECLARE_WIN = 'UPDATE_CAN_DECLARE_WIN';
export const UPDATE_CAN_DECLARE_KONG = 'UPDATE_CAN_DECLARE_KONG';
export const DECLARE_WIN = 'DECLARE_WIN';
export const DECLARE_KONG = 'DECLARE_KONG';
export const END_GAME = 'END_GAME';
export const LEAVE_GAME = 'LEAVE_GAME';
export const UPDATE_CONCEALED_KONGS = 'UPDATE_CONCEALED_KONGS';
export const START_GAME = 'START_GAME';

export const moveTile = (srcIndex: number, dstIndex: number) => ({
	type: MOVE_TILE,
	srcIndex,
	dstIndex,
});

export const joinGame = (
	username: string,
	roomId: string,
	shouldCreateRoom: boolean
) => ({
	type: JOIN_GAME,
	username,
	roomId,
	shouldCreateRoom,
});

export const rejoinGame = (payload: any) => ({
	type: REJOIN_GAME,
	payload,
});

export const sendMessage = (message: string) => ({
	type: SEND_MESSAGE,
	message,
});

export const updateOpponents = (opponents: any[]) => ({
	type: UPDATE_OPPONENTS,
	opponents,
});

export const updateTiles = (tiles: any[]) => ({
	type: UPDATE_TILES,
	tiles,
});

export const endTurn = () => ({
	type: END_TURN,
});

export const updateMessages = (message: Message) => ({
	type: UPDATE_MESSAGES,
	message,
});

export const selectTile = (tileIndex: number) => ({
	type: SELECT_TILE,
	tileIndex,
});

export const updateDiscardedTile = (discardedTile: any) => ({
	type: UPDATE_DISCARDED_TILE,
	discardedTile,
});

export const updateRoomId = (roomId: string) => ({
	type: UPDATE_ROOM_ID,
	roomId,
});

export const updateCurrentState = (newState: any) => ({
	type: UPDATE_CURRENT_STATE,
	newState,
});

export const drawTile = () => ({
	type: DRAW_TILE,
});

export const extendTiles = (newTile: any) => ({
	type: EXTEND_TILES,
	newTile,
});

export const claimTile = (claimType: any) => ({
	type: CLAIM_TILE,
	claimType,
});

export const updateValidMeldSubsets = (validMeldSubsets: any[], newMeld: any, newMeldTargetLength: number) => ({
	type: PRE_REVEAL_MELD,
	validMeldSubsets,
	newMeld,
	newMeldTargetLength,
});

export const setRevealedMelds = (revealedMelds: any[]) => ({
	type: SET_REVEALED_MELDS,
	revealedMelds,
});

export const receivePendingEvents = () => ({
	type: RECEIVE_PENDING_EVENTS,
});

export const showMeldableTiles = (droppedTileIndex: number | null) => ({
	type: SHOW_MELDABLE_TILES,
	droppedTileIndex,
});

export const extendNewMeld = (droppedTileIndex: number) => ({
	type: EXTEND_NEW_MELD,
	droppedTileIndex,
});

export const completeNewMeld = (newMeld: any) => ({
	type: COMPLETE_NEW_MELD,
	newMeld,
});

export const updateCanDeclareWin = (canDeclareWin: boolean) => ({
	type: UPDATE_CAN_DECLARE_WIN,
	canDeclareWin,
});

export const declareWin = () => ({
	type: DECLARE_WIN,
});

export const updateCanDeclareKong = (canDeclareKong: boolean) => ({
	type: UPDATE_CAN_DECLARE_KONG,
	canDeclareKong,
});

export const declareKong = () => ({
	type: DECLARE_KONG,
});

export const endGame = () => ({
	type: END_GAME,
});

export const leaveGame = () => ({
	type: LEAVE_GAME,
});

export const updateConcealedKongs = (concealedKongs: any[]) => ({
	type: UPDATE_CONCEALED_KONGS,
	concealedKongs,
});

export const updatePlayer = (player: any) => ({
	type: UPDATE_PLAYER,
	player,
});

export const startGame = () => ({
	type: START_GAME,
});
