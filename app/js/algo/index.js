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
 * Given the ID of a dive in the dive profile,
 * returns an enum indicating the status of the dive (good, warning, bad).
 */
algo.getStatus = function(dive) {
	// @TODO: Actually do this. Should depend on previous dives.
	if (dive.depth === this.MAX_DEPTH || dive.time === this.MAX_TIME) {
		return this.status.BAD;
	}
	if (dive.depth / this.MAX_DEPTH > 0.9 || dive.time / this.MAX_TIME > 0.9) {
		return this.status.WARNING;
	}
	return this.status.GOOD;
};

/**
 * Returns the number of hours until it is safe to fly, based on the current dive profile.
 */
algo.getTimeToFly = function() {
	// @TODO
	return 18;
};

/**
 * Given the ID of a surface interval in the dive profile,
 * returns the minimum safe (green) surface interval, in minutes.
 */
algo.minimizeSurfaceInterval = function(id) {
	// @ TODO
	return 10;
};

module.exports = algo;
