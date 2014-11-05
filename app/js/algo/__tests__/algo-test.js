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

jest.dontMock('../index');

describe('Algorithm', function() {
	beforeEach(function() {
		algo = require('../index');
	});

	it('correctly calculates the time to fly', function() {
		expect(algo.getTimeToFly({
			dives: ['dive']
		})).toEqual(12);
		expect(algo.getTimeToFly({
			dives: ['dive', 'another dive']
		})).toEqual(18);
	});
});
