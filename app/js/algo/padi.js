/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var padi = {};

padi.MIN_DEPTH = 10;
padi.MAX_DEPTH = 40;
padi.DEFAULT_DEPTH = 20;

padi.MIN_TIME = 0;
padi.MAX_TIME = 220;
padi.DEFAULT_TIME = 20;

padi.MIN_SURFACE_INTERVAL = 0;
padi.MAX_SURFACE_INTERVAL = 360;
padi.DEFAULT_SURFACE_INTERVAL = 60;

padi.getTimeToFly = function() {
	// @TODO - this should take an argument which is the entire profile...?
	return 18;
};

module.exports = padi;
