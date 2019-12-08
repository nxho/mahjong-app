import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import Mahjong from './containers/Mahjong';
import * as serviceWorker from './serviceWorker';
import uuidv1 from 'uuid/v1';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import io from 'socket.io-client';
import createSocketMiddleware from './middleware';
import config from './config';

import './index.css';

// Generate new uuid for this user session, if it doesn't exist
const uuidKey = 'mahjong-player-uuid';
if (!localStorage.getItem(uuidKey)) {
	localStorage.setItem(uuidKey, uuidv1());
}

const socket = io(config.socket.SERVER_URL);
const store = createStore(
	rootReducer,
	applyMiddleware(createSocketMiddleware(socket))
);

ReactDOM.render(
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<Mahjong />
		</DndProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

