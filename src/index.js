import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import './index.css';
import Mahjong from './containers/Mahjong';
import * as serviceWorker from './serviceWorker';

import createSocketMiddleware from './middleware';
import config from './config';

const store = createStore(
	rootReducer,
	// TODO: modify to take in a socketio instance, so we can override for testing?
	applyMiddleware(createSocketMiddleware(config.socket.SERVER_URL))
);

ReactDOM.render(
	<Provider store={store}>
		<Mahjong />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

