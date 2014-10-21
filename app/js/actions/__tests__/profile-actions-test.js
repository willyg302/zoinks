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

jest.dontMock('../../constants');
jest.dontMock('../profile-actions');

describe('ProfileActions', function() {
	var Constants = require('../../constants');

	beforeEach(function() {
		AppDispatcher = require('../../dispatcher/app-dispatcher');
		ProfileActions = require('../profile-actions');
	});

	it('should delegate to the AppDispatcher', function() {
		ProfileActions.addDive();
		expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
	});

	it('should pipe special dive actions into the generic handler', function() {
		ProfileActions.updateDiveTitle(0, 'I like pie');
		expect(AppDispatcher.handleViewAction.mock.calls[0][0]).toEqual({
			actionType: Constants.DIVE_UPDATE,
			id: 0,
			delta: {title: 'I like pie'}
		});
	});

	it('correctly handles loading a profile from a string', function() {
		ProfileStore = require('../../stores/profile-store');
		ProfileStore.validateProfile.mockReturnValueOnce({valid: false}).mockReturnValueOnce({valid: true});
		expect(ProfileActions.loadProfileFromString('not json').valid).toBe(false);
		expect(ProfileActions.loadProfileFromString('{"a": "b"}').valid).toBe(false);
		expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(0);
		expect(ProfileActions.loadProfileFromString('{"hey": "this will work"}').valid).toBe(true);
		expect(AppDispatcher.handleViewAction.mock.calls[0][0]).toEqual({
			actionType: Constants.PROFILE_LOAD,
			profile: {hey: 'this will work'}
		});
	});
});
