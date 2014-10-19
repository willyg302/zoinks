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
	var complexActual = {
		a: ['Is', 'this', 'the', 'real', 'life?'],
		profile: {
			name: 'Freddie Mercury',
			location: 'landslide',
			occupation: 'poor boy',
			comments: [
				'Is this just fantasy?',
				'No escape from reality'
			],
			willTheyLetHimGo: false
		}
	};

	var complexExpected = {
		a: ['string'],
		profile: {
			name: 'string',
			location: 'string',
			occupation: 'string',
			comments: function(e) {
				return e.length > 0;
			},
			willTheyLetHimGo: 'boolean'
		}
	};

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

	it('validates objects correctly', function() {
		expect(utils.validate([], 5)).toBe(false);
		expect(utils.validate([1, 'fail', 3], ['number'])).toBe(false);
		expect(utils.validate(['this', 'will', 'pass'], ['string'])).toBe(true);
		expect(utils.validate({a: 'You shall not pass!'}, {a: 'number'})).toBe(false);
		expect(utils.validate(5, function(e) {
			return e === Math.PI;
		})).toBe(false);
		expect(utils.validate({hey: 'look at me!'}, function(e) {
			return e.hey === 'look at me!';
		})).toBe(true);
		expect(utils.validate(5, 'number')).toBe(true);
	});

	it('handles a complex nested validation', function() {
		expect(utils.validate(complexActual, complexExpected)).toBe(true);
	});
});
