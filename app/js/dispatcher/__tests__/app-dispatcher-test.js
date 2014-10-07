/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
'use strict';

jest.autoMockOff();

describe('AppDispatcher', function() {
	var AppDispatcher;

	beforeEach(function() {
		AppDispatcher = require('../app-dispatcher');
	});

	it('sends actions to subscribers', function() {
		var listener = jest.genMockFunction();
		AppDispatcher.register(listener);

		var payload = {};
		AppDispatcher.dispatch(payload);
		expect(listener.mock.calls.length).toBe(1);
		expect(listener.mock.calls[0][0]).toBe(payload);
	});
});
