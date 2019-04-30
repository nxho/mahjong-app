import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import './index.css';
import Mahjong from './containers/Mahjong';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';

const store = createStore(rootReducer, {
	socket: io('http://localhost:5000', {transports: ['websocket']}),
});

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

