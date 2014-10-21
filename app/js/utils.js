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

utils.getTimeString = function(min) {
	var h = Math.floor(min / 60);
	var m = min % 60;
	return [
		h === 0 ? '' : (h + " hr"),
		(m === 0 && h !== 0) ? '' : (m + " min")
	].join(' ').trim();
};

module.exports = utils;
