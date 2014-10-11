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

	var mockAddDive = {
		source: 'VIEW_ACTION',
		action: {
			actionType: Constants.DIVE_ADD
		}
	};

	var mockRemoveDive = {
		source: 'VIEW_ACTION',
		action: {
			actionType: Constants.DIVE_REMOVE
		}
	};

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
		expect(profile.units).toEqual('meters');
		expect(profile.dives.length).toEqual(1);
	});

	it('creates a dive', function() {
		callback(mockAddDive);
		var profile = ProfileStore.getProfile();
		expect(profile.dives.length).toBe(2);
	});

	it('removes a dive', function() {
		callback(mockAddDive);
		var profile = ProfileStore.getProfile();
		expect(profile.dives.length).toBe(2);
		callback(mockRemoveDive);
		expect(profile.dives.length).toBe(1);
	});

	it('does not remove the last dive', function() {
		callback(mockRemoveDive);
		var profile = ProfileStore.getProfile();
		expect(profile.dives.length).toBe(1);
	});
});
