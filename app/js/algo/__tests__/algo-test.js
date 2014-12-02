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
jest.dontMock('../padi');
jest.dontMock('../../utils');

describe('Algorithm', function() {
	var goodDives = [
		{t: 0, d: 10},
		{t: 133, d: 10},
		{t: 101, d: 12},
		{t: 73, d: 14},
		{t: 56, d: 16},
		{t: 46, d: 18},
		{t: 36, d: 20},
		{t: 29, d: 22},
		{t: 22, d: 25},
	];

	var warningDives = [
		{t: 160, d: 10},
		{t: 116, d: 12},
		{t: 82, d: 14},
		{t: 63, d: 16},
		{t: 51, d: 18},
		{t: 40, d: 20},
		{t: 32, d: 22},
		{t: 25, d: 25},
		{t: 0, d: 31},
	];

	var badDives = [
		{t: 239, d: 10},
		{t: 157, d: 12},
		{t: 108, d: 14},
		{t: 82, d: 16},
		{t: 66, d: 18},
		{t: 55, d: 20},
		{t: 47, d: 22},
		{t: 39, d: 25},
		{t: 10, d: 42},
	];

	var maximumDepths = [
		{t: 0, d: 30},
		{t: 20, d: 27},
		{t: 40, d: 19},
		{t: 60, d: 16},
		{t: 80, d: 14},
		{t: 100, d: 12},
		{t: 120, d: 11},
		{t: 140, d: 11},
		{t: 160, d: 10},
	];

	var maximumTimes = [
		{d: 10, t: 157},
		{d: 12, t: 107},
		{d: 14, t: 78},
		{d: 16, t: 59},
		{d: 18, t: 46},
		{d: 20, t: 37},
		{d: 25, t: 23},
		{d: 30, t: 16},
		{d: 35, t: 0},
	];

	var twoDivesGood = {
		dives: [
			{depth: 20, time: 20},
			{depth: 15, time: 45}
		],
		surfaceIntervals: [{time: 60}]
	};

	var twoDivesWarning = {
		dives: [
			{depth: 20, time: 20},
			{depth: 20, time: 30}
		],
		surfaceIntervals: [{time: 60}]
	};

	var twoDivesBad = {
		dives: [
			{depth: 30, time: 20},
			{depth: 30, time: 50}
		],
		surfaceIntervals: [{time: 100}]
	};

	var threeDives = {
		dives: [
			{depth: 20, time: 20},
			{depth: 20, time: 20},
			{depth: 20, time: 20}
		],
		surfaceIntervals: [{time: 0}, {time: 0}]
	};

	var fiveDives = {
		dives: [
			{depth: 25, time: 20},
			{depth: 18, time: 18},
			{depth: 20, time: 30},
			{depth: 20, time: 30},
			{depth: 25, time: 45}
		],
		surfaceIntervals: [{time: 100}, {time: 100}, {time: 100}, {time: 100}]
	};

	var testSingleDiveStatus = function(t, d, status) {
		expect(algo.getStatus({
			dives: [{depth: d, time: t}],
			surfaceIntervals: []
		}, 0)).toEqual(status);
		expect(algo.isBadDive(t, d)).toBe(status === algo.status.BAD);
		// A bad dive is considered to be in the warning area as well
		expect(algo.isWarningDive(t, d)).toBe(status !== algo.status.GOOD);
	};

	beforeEach(function() {
		algo = require('../index');
	});

	it('correctly determines if a dive is good', function() {
		goodDives.map(function(dive) {
			testSingleDiveStatus(dive.t, dive.d, algo.status.GOOD);
		});
	});

	it('correctly determines if a dive is warning', function() {
		warningDives.map(function(dive) {
			testSingleDiveStatus(dive.t, dive.d, algo.status.WARNING);
		});
	});

	it('correctly determines if a dive is bad', function() {
		badDives.map(function(dive) {
			testSingleDiveStatus(dive.t, dive.d, algo.status.BAD);
		});
	});

	it('correctly determines the status of a repeat dive', function() {
		expect(algo.getStatus(twoDivesGood, 1)).toEqual(algo.status.GOOD);
		expect(algo.getStatus(twoDivesWarning, 1)).toEqual(algo.status.WARNING);
		expect(algo.getStatus(twoDivesBad, 1)).toEqual(algo.status.BAD);

		[
			algo.status.GOOD,
			algo.status.WARNING,
			algo.status.BAD
		].map(function(status, i) {
			expect(algo.getStatus(threeDives, i)).toEqual(status);
		});

		[
			algo.status.GOOD,
			algo.status.GOOD,
			algo.status.WARNING,
			algo.status.WARNING,
			algo.status.BAD
		].map(function(status, i) {
			expect(algo.getStatus(fiveDives, i)).toEqual(status);
		});
	});

	it('correctly calculates the time to fly', function() {
		expect(algo.getTimeToFly({
			dives: ['dive']
		})).toEqual(12);
		expect(algo.getTimeToFly({
			dives: ['dive', 'another dive']
		})).toEqual(18);
	});

	it('correctly maximizes the depth of a single dive', function() {
		maximumDepths.map(function(dive) {
			expect(Math.round(algo.calcMaximumDepth(dive.t))).toEqual(dive.d);
		});
	});

	it('correctly maximizes the depth of a repeat dive', function() {
		expect(Math.round(algo.maximizeDepth(twoDivesBad, 0))).toEqual(27);
		expect(Math.round(algo.maximizeDepth(twoDivesBad, 1))).toEqual(16);

		[27, 22, 19, 18, 16].map(function(depth, i) {
			expect(Math.round(algo.maximizeDepth(fiveDives, i))).toEqual(depth);
		});
	});

	it('correctly maximizes the time of a single dive', function() {
		maximumTimes.map(function(dive) {
			expect(Math.round(algo.calcMaximumTime(dive.d))).toEqual(dive.t);
		});
	});

	it('correctly maximizes the time of a repeat dive', function() {
		expect(Math.round(algo.maximizeTime(twoDivesBad, 0))).toEqual(16);
		expect(Math.round(algo.maximizeTime(twoDivesBad, 1))).toEqual(9);

		[23, 34, 26, 23, 12].map(function(depth, i) {
			expect(Math.round(algo.maximizeTime(fiveDives, i))).toEqual(depth);
		});
	});

	it('correctly minimizes a surface interval', function() {
		expect(Math.round(algo.minimizeSurfaceInterval(twoDivesGood, 0))).toEqual(32);
		expect(Math.round(algo.minimizeSurfaceInterval(twoDivesWarning, 0))).toEqual(183);

		// NaN is returned when the second dive is bad even if the surface interval is maximized
		expect(isNaN(Math.round(algo.minimizeSurfaceInterval(twoDivesBad, 0)))).toBe(true);

		[28, 79].map(function(si, i) {
			expect(Math.round(algo.minimizeSurfaceInterval(threeDives, i))).toEqual(si);
		});

		// Last should be NaN
		[4, 196, 214].map(function(si, i) {
			expect(Math.round(algo.minimizeSurfaceInterval(fiveDives, i))).toEqual(si);
		});
	});
});
