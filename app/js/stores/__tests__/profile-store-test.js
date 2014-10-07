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

jest.dontMock('react/lib/merge');
jest.dontMock('../../constants');
jest.dontMock('../profile-store');

describe('ProfileStore', function() {

	var Constants = require('../../constants');


	beforeEach(function() {
		AppDispatcher = require('../../dispatcher/app-dispatcher');
		ProfileStore = require('../profile-store');
		callback = AppDispatcher.register.mock.calls[0][0];
	});

	it('should register a callback with the dispatcher', function() {
		expect(AppDispatcher.register.mock.calls.length).toBe(1);
	});

	it('should initialize with default values', function() {
		var profile = ProfileStore.getProfile();
		expect(profile.units).toEqual('feet');
		expect(profile.dives.length).toEqual(1);
	});


	/*
	// mock actions inside dispatch payloads
	var actionTodoCreate = {
		source: 'VIEW_ACTION',
		action: {
			actionType: TodoConstants.TODO_CREATE,
			text: 'foo'
		}
	};
	var actionTodoDestroy = {
		source: 'VIEW_ACTION',
		action: {
			actionType: TodoConstants.TODO_DESTROY,
			id: 'replace me in test'
		}
	};


	it('creates a to-do item', function() {
		callback(actionTodoCreate);
		var all = TodoStore.getAll();
		var keys = Object.keys(all);
		expect(keys.length).toBe(1);
		expect(all[keys[0]].text).toEqual('foo');
	});

	it('destroys a to-do item', function() {
		callback(actionTodoCreate);
		var all = TodoStore.getAll();
		var keys = Object.keys(all);
		expect(keys.length).toBe(1);
		actionTodoDestroy.action.id = keys[0];
		callback(actionTodoDestroy);
		expect(all[keys[0]]).toBeUndefined();
	});

	
*/

});
