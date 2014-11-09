/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var keyMirror = require('react/lib/keyMirror');

var algo = require('./padi');


algo.status = keyMirror({
	GOOD: null,
	WARNING: null,
	BAD: null
});

/**
 * A utility function to determine the RNT for the dive with a given ID.
 * Naturally, the first dive has an RNT of 0.
 */
algo.getRNT = function(profile, id) {
	if (id === 0) {
		return 0;
	}
	var t = profile.dives[id - 1].time;
	var d = profile.dives[id - 1].depth;
	var i = profile.surfaceIntervals[id - 1].time;
	var pg = this.calcPG(t + this.getRNT(profile, id - 1), d);
	var rpg = this.calcRPG(pg, i);
	return this.calcRNT(rpg, profile.dives[id].depth);
};

/**
 * Given the ID of a dive in the dive profile,
 * returns an enum indicating the status of the dive (good, warning, bad).
 */
algo.getStatus = function(profile, id) {
	var d = profile.dives[id].depth;
	var t = profile.dives[id].time + this.getRNT(profile, id);
	if (this.isBadDive(t, d)) {
		return this.status.BAD;
	}
	return this.isWarningDive(t, d) ? this.status.WARNING : this.status.GOOD;
};

/**
 * Returns the number of hours until it is safe to fly, based on the current dive profile.
 */
algo.getTimeToFly = function(profile) {
	return (profile.dives.length === 1) ? 12 : 18;
};

/**
 * Given the ID of a dive in the dive profile,
 * returns the maximum safe depth the dive can be adjusted to.
 */
algo.maximizeDepth = function(profile, id) {
	var max = this.calcMaximumDepth(profile.dives[id].time + this.getRNT(profile, id));
	return Math.min(Math.max(max, this.MIN_DEPTH), this.MAX_DEPTH);
};

/**
 * Given the ID of a dive in the dive profile,
 * returns the maximum safe time the dive can be adjusted to.
 */
algo.maximizeTime = function(profile, id) {
	var max = this.calcMaximumTime(profile.dives[id].depth) - this.getRNT(profile, id);
	return Math.min(Math.max(max, this.MIN_TIME), this.MAX_TIME);
};

/**
 * Given the ID of a surface interval in the dive profile,
 * returns the minimum safe (green) surface interval, in minutes.
 */
algo.minimizeSurfaceInterval = function(profile, id) {
	var cur = profile.dives[id];
	var next = profile.dives[id + 1];
	var rnt = this.calcMaximumTime(next.depth) - next.time;
	var rpg = this.calcRPGFromRNT(rnt, next.depth);
	var pg = this.calcPG(cur.time + this.getRNT(profile, id), cur.depth);
	var min = this.calcSIFromRPG(pg, rpg);
	return Math.min(Math.max(min, this.MIN_SURFACE_INTERVAL), this.MAX_SURFACE_INTERVAL);
};

module.exports = algo;
