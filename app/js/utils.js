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

utils.validate = function self(actual, expected) {
	if (expected instanceof Array) {
		if (!(actual instanceof Array)) {
			return false;
		}
		for (var i = 0; i < actual.length; i++) {
			if (!self(actual[i], expected[0])) {
				return false;
			}
		}
		return true;
	} else if (typeof expected === 'object') {
		for (var e in expected) {
			if (expected.hasOwnProperty(e) && !(actual.hasOwnProperty(e) && self(actual[e], expected[e]))) {
				return false;
			}
		}
		return true;
	} else if (typeof expected === 'function') {
		return expected(actual);
	}
	return (typeof actual === expected);
};

module.exports = utils;
