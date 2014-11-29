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

describe('Algorithm', function() {
	beforeEach(function() {
		algo = require('../index');
	});

	it('correctly determines if a dive is bad', function() {
		expect(algo.isBadDive(40, 20)).toBe(false);
		expect(algo.isBadDive(13, 60)).toBe(true);
		expect(algo.isBadDive(220, 20)).toBe(true);
		expect(algo.isBadDive(60, 18)).toBe(true);
		expect(algo.isBadDive(25, 30)).toBe(true);
		expect(algo.isBadDive(15, 42)).toBe(true);
		expect(algo.isBadDive(42, 10)).toBe(false);
	});

	it('correctly determines if a dive is warning', function() {
		expect(algo.isWarningDive(180, 10)).toBe(true);
		expect(algo.isWarningDive(55, 16)).toBe(false);
		expect(algo.isWarningDive(35, 22)).toBe(true);
		expect(algo.isWarningDive(0, 35)).toBe(true);
		expect(algo.isWarningDive(25, 28)).toBe(true);
		expect(algo.isWarningDive(14, 87)).toBe(true);
	});

	it('correctly determines the status of a repeat dive', function() {
		expect(algo.getStatus({
			dives: [
				{depth: 20, time: 20},
				{depth: 15, time: 45}
			],
			surfaceIntervals: [{time: 60}]
		}, 1)).toEqual(algo.status.GOOD);

		//testing for the warning dive 
		expect(algo.getStatus({
			dives: [
				{depth: 20, time: 20},
				{depth: 20, time: 30}
			],
			surfaceIntervals: [{time: 60}]
		}, 1)).toEqual(algo.status.WARNING);

		//testing for bad dives 
		expect(algo.getStatus({
			dives: [
				{depth: 20, time: 20},
				{depth: 20, time: 20},
				{depth: 20, time: 20}
			],
			surfaceIntervals: [{time: 60}, {time: 0}]
		}, 2)).toEqual(algo.status.BAD);
	});

	it('correctly calculates the time to fly', function() {
		expect(algo.getTimeToFly({
			dives: ['dive']
		})).toEqual(12);
		expect(algo.getTimeToFly({
			dives: ['dive', 'another dive']
		})).toEqual(18);
	});

	it('correctly maximizes the depth of a dive', function() {
		expect(Math.round(algo.calcMaximumDepth(0))).toEqual(30);
		expect(Math.round(algo.calcMaximumDepth(20))).toEqual(27);
		expect(Math.round(algo.calcMaximumDepth(70))).toEqual(15);
		expect(Math.round(algo.calcMaximumDepth(20))).toEqual(27);
		expect(Math.round(algo.calcMaximumDepth(90))).toEqual(13);
		expect(Math.round(algo.calcMaximumDepth(45))).toEqual(18);
			//repeat dive 
		expect(Math.round(algo.maximizeDepth({
			dives: [
				{depth: 30, time: 20},
				{depth: 30, time: 50}
			],
			surfaceIntervals: [{time: 100}]
		}, 0))).toEqual(27);

		expect(Math.round(algo.maximizeDepth({
			dives: [
				{depth: 30, time: 20},
				{depth: 30, time: 50}
			],
			surfaceIntervals: [{time: 100}]
		}, 1))).toEqual(16);

		expect(Math.round(algo.maximizeDepth({
			dives: [
				{depth: 40, time: 20},
				{depth: 50, time: 40}
			],
			surfaceIntervals: [{time: 100}]
		}, 1))).toEqual(19);

		expect(Math.round(algo.maximizeDepth({
			dives: [
				{depth: 50, time: 20.1},
				{depth: 29.6, time: 19.7}
			],
			surfaceIntervals: [{time: 100}]
		}, 1))).toEqual(22);
		// @TODO Repeat dive
	});

	it('correctly maximizes the time of a dive', function() {
		expect(Math.round(algo.calcMaximumTime(10))).toEqual(157);
		expect(Math.round(algo.calcMaximumTime(40))).toEqual(0);
		expect(Math.round(algo.calcMaximumTime(25))).toEqual(23);
		//repeat dive 
		/*expect(Math.round(algo.maximizeTime({
			dives: [
				{depth: 30, time: 20},
				{depth: 30, time: 50}
			],
			surfaceIntervals: [{time: 100}]
		}, 0))).toEqual(32);

		expect(Math.round(algo.minimizeTime({
			dives: [
				{depth: 40, time: 40},
				{depth: 30, time: 45}
			],
			surfaceIntervals: [{time: 100}]
		}, 0))).toEqual(100);*/
		// @TODO Repeat dive
	});

	it('correctly minimizes a surface interval', function() {
		expect(Math.round(algo.minimizeSurfaceInterval({
			dives: [
				{depth: 20, time: 20},
				{depth: 15, time: 45}
			],
			surfaceIntervals: [{time: 100}]
		}, 0))).toEqual(32);

		expect(Math.round(algo.minimizeSurfaceInterval({
			dives: [
				{depth: 29.9, time: 17.8},
				{depth: 23.8, time: 18.1}
			],
			surfaceIntervals: [{time: 500}]
		}, 0))).toEqual(121);

		expect(Math.round(algo.minimizeSurfaceInterval({
			dives: [
				{depth: 26.9, time: 19.3},
				{depth: 24.9, time: 12}
			],
			surfaceIntervals: [{time: 500}]
		}, 0))).toEqual(63);

		expect(Math.round(algo.minimizeSurfaceInterval({
			dives: [
				{depth: 29.8, time: 13.4},
				{depth: 19.7 , time: 25.2}
			],
			surfaceIntervals: [{time: 400}]
		}, 0))).toEqual(64);

		expect(Math.round(algo.minimizeSurfaceInterval({
			dives: [
				{depth: 36, time: 16.4},
				{depth: 24.8  , time: 10.4}
			],
			surfaceIntervals: [{time: 300}]
		}, 0))).toEqual(59);

		expect(Math.round(algo.minimizeSurfaceInterval({
			dives: [
				{depth: 33.7, time: 13.8},
				{depth: 16.8, time: 26}
			],
			surfaceIntervals: [{time: 300}]
		}, 0))).toEqual(9);

	});
});
