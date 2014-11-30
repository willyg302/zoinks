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

jest.dontMock('../utils');

describe('utils', function() {
	beforeEach(function() {
		utils = require('../utils');
	});

	it('converts between feet and meters correctly', function() {
		expect(utils.convertUnits(42, 'meters', 'meters')).toEqual(42);
		expect(utils.convertUnits(100, 'feet', 'meters')).toEqual(30.48);
		expect(utils.convertUnits(100, 'meters', 'feet')).toEqual(328.084);
		expect(utils.convertUnits(0, 'feet', 'meters')).toEqual(0);  // Should be straight multiplication
	});

	it('generates an appropriate human-readable time string', function() {
		expect(utils.getTimeString(42)).toEqual('42 min');
		expect(utils.getTimeString(120)).toEqual('2 hr');
		expect(utils.getTimeString(314)).toEqual('5 hr 14 min');
		expect(utils.getTimeString(0)).toEqual('0 min');
	});

	it('implements clamp correctly', function() {
		expect(utils.clamp(1, 0, 2)).toEqual(1);
		expect(utils.clamp(0, 1, 2)).toEqual(1);
		expect(utils.clamp(2, 0, 1)).toEqual(1);
	});
});
