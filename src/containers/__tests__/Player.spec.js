import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'

import createSocketMiddleware from '../../middleware';
import reducer from '../../reducers';
import Player from '../Player';

const initMockSocket = () => ({
	on: jest.fn((event, func) => {
		console.log(`mockSocket on('${event}') called`);
	}),
	emit: jest.fn((event, payload = {}) => {
		console.log(`mockSocket emit('${event}') called`);
	}),
});

const renderWithRedux = (
	ui,
	{ initialState, store = createStore(reducer, initialState) } = {}
) => ({
	...render(<Provider store={store}>{ui}</Provider>),
	// adding `store` to the returned utilities to allow us
	// to reference it in our tests (just try to avoid using
	// this to test implementation details).
	store,
});

describe('Player component', () => {
	afterEach(() => {
		cleanup();
	});

	it('should dispatch END_TURN action when end turn button is pressed', async () => {
		const mockSocket = initMockSocket();
		const store = createStore(reducer, applyMiddleware(createSocketMiddleware(mockSocket)));
		const { getByText } = renderWithRedux(
			<Player
				name='Player1'
				tiles={[]}
				isCurrentTurn={true}>
			</Player>,
			{ store }
		);

		const endTurnButton = await waitForElement(() => getByText('End Turn'));
		fireEvent.click(endTurnButton);

		expect(mockSocket.emit).toBeCalledWith('end_turn');
	});
});


