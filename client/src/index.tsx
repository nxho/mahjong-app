import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Mahjong } from './containers/Mahjong';
import { v4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import io from 'socket.io-client';
import createSocketMiddleware from './middleware';
import config from './config';

import './index.css';

// Generate new uuid for this user session, if it doesn't exist
const uuidKey = 'mahjong-player-uuid';
if (!localStorage.getItem(uuidKey)) {
	localStorage.setItem(uuidKey, v4());
}

const serverUrl = process.env.REACT_APP_SERVER_URL ?? config.socket.SERVER_URL;
const socket = io(serverUrl);
const store = createStore(
	rootReducer,
	applyMiddleware(createSocketMiddleware(socket)),
);

ReactDOM.render(
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<Mahjong />
		</DndProvider>
	</Provider>,
	document.getElementById('root'),
);
