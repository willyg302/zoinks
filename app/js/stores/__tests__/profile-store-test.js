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

	var mockViewAction = function(a) {
		return {
			source: 'VIEW_ACTION',
			action: a
		};
	};

	var mockAddDive = mockViewAction({
		actionType: Constants.DIVE_ADD
	});

	var mockRemoveDive = mockViewAction({
		actionType: Constants.DIVE_REMOVE
	});

	var mockUpdateDive = mockViewAction({
		actionType: Constants.DIVE_UPDATE,
		id: 0,
		delta: {
			title: 'Djibouti',
			depth: 9001
		}
	});

	var mockUpdateSurfaceInterval = mockViewAction({
		actionType: Constants.SURFACE_INTERVAL_UPDATE,
		id: 0,
		time: 1
	});

	var mockChangeProfileUnits = mockViewAction({
		actionType: Constants.PROFILE_CHANGE_UNITS,
		units: 'feet'
	});

	var mockLoadProfile = mockViewAction({
		actionType: Constants.PROFILE_LOAD,
		profile: {i: 'like pie'}
	});

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
		expect(profile.dives.length).toBe(1);
	});

	it('creates and removes a dive', function() {
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

	it('updates a dive', function() {
		callback(mockUpdateDive);
		var dive = ProfileStore.getProfile().dives[0];
		expect(dive.title).toEqual('Djibouti');
		expect(dive.depth).toEqual(9001);
	});

	it('updates a surface interval', function() {
		callback(mockAddDive);
		callback(mockUpdateSurfaceInterval);
		var surfaceInterval = ProfileStore.getProfile().surfaceIntervals[0];
		expect(surfaceInterval.time).toEqual(1);
	});

	it('changes the profile units', function() {
		callback(mockChangeProfileUnits);
		var profile = ProfileStore.getProfile();
		expect(profile.units).toEqual('feet');
	});

	it('loads a profile', function() {
		callback(mockLoadProfile);
		var profile = ProfileStore.getProfile();
		expect(profile.i).toEqual('like pie');
	});

	it('correctly invalidates common profile mistakes', function() {
		// Bad units
		expect(ProfileStore.validateProfile({
			units: 'fet',
			dives: [{
				title: 'fake',
				depth: 0,
				time: 0
			}],
			surfaceIntervals: []
		}).valid).toBe(false);
		// Missing dive
		expect(ProfileStore.validateProfile({
			units: 'meters',
			dives: [],
			surfaceIntervals: []
		}).valid).toBe(false);
		// Invalid values
		expect(ProfileStore.validateProfile({
			units: 'feet',
			dives: [{
				title: 'Marianas Trench',
				depth: -1,
				time: 3000
			}],
			surfaceIntervals: [{
				time: 'not even a number'
			}]
		}).errors.length).toBe(3);
	});
});
