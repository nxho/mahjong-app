import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'
import io from 'socket.io-client';
import config from '../../config';
import createSocketMiddleware from '../../middleware';

import reducer from '../../reducers';
import Mahjong from '../Mahjong';

const initSocket = () => {
	return new Promise((resolve, reject) => {
		const socket = io(config.socket.SERVER_URL, {
			// for testing purposes, we need to force this upgrade to websocket connection
			// without this, I ran into problems such as:
			//  - the board would not be rendered
			// 	- we wouldn't receive logs from the middleware
			// the server would receive the events emitted by the socket successfully, but I guess
			// the client wasn't receiving certain events (assumption based on the above problems)
			transports: ['websocket'],
		});

		socket.on('connect', () => {
			resolve(socket);
		});

		setTimeout(() => {
      reject(new Error("Failed to connect within 5 seconds."));
    }, 5000);
	});
}

const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) => ({
	...render(<Provider store={store}>{ui}</Provider>, {
		// this will make the wrapping div the baseElement instead of the whole document body
		container: document.body.appendChild(document.createElement('div')),
	}),
	// adding `store` to the returned utilities to allow us
	// to reference it in our tests (just try to avoid using
	// this to test implementation details).
	store,
})

const renderMahjongWithUsername = async (username) => {
	const socket = await initSocket();
	const store = createStore(reducer, applyMiddleware(createSocketMiddleware(socket)))
	const { getByLabelText, getAllByTestId, getByTestId, debug } = renderWithRedux(<Mahjong />, {
		store,
	});
	const usernameInput = getByLabelText('Name:', {
		selector: 'input',
	})
	fireEvent.change(usernameInput, { target: { value: username } });
	fireEvent.submit(getByTestId('username-form'));

	await waitForElement(() => getByTestId('waiting-room'));

	return { getByLabelText, getAllByTestId, getByTestId };
}

describe('Mahjong component', () => {
	afterEach(() => {
		cleanup();
	});

	it('should show Board component when enough players have joined', async () => {
		const { getByLabelText, getAllByTestId, getByTestId } = await renderMahjongWithUsername('main_player');
		for(let i = 0; i < 3; i++) {
			await renderMahjongWithUsername(`opponent_${i}`);
		}

		await waitForElement(() => getByTestId('board'));
	});
});

