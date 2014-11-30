/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var utils = {};

utils.toFeet = function(meters) {
	return meters * 3.28084;
};

utils.toMeters = function(feet) {
	return feet * 0.3048;
};

utils.convertUnits = function(v, from, to) {
	if (from === to) {
		return v;
	}
	return (to === 'meters' ? this.toMeters(v) : this.toFeet(v));
};

utils.splitTime = function(min) {
	return {
		h: Math.floor(min / 60),
		m: min % 60
	};
};

utils.getTimeString = function(min) {
	var x = this.splitTime(min);
	return [
		x.h === 0 ? '' : (x.h + " hr"),
		(x.m === 0 && x.h !== 0) ? '' : (x.m + " min")
	].join(' ').trim();
};

utils.clamp = function(val, min, max) {
	return Math.min(Math.max(val, min), max);
};

module.exports = utils;
