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


/**
 * Given the time t and depth d,
 * returns true if a dive is considered "bad".
 */
padi.isBadDive = function(t, d) {
	var a = 105.4459074484564;
	var b = -0.4334667424949577;

	return (d > a * Math.pow(t, b));
};

/**
 * Given the time t of a dive, returns the maximum safe depth.
 * Note that this does not assume anything about repeat dives!
 * You will need to adjust t to account for RNT separately if necessary.
 */
padi.calcMaximumDepth = function(t) {
	var a = 113.95854764967993;
	var b = -0.48150981158021355;

	return Math.min(30, a * Math.pow(t, b));
};

/**
 * Given the depth d of a dive, returns the maximum safe time.
 * Note that this does not assume anything about repeat dive!
 * You will need to adjust the returned value by RNT if necessary.
 */
padi.calcMaximumTime = function(d) {
	var a = 113.95854764967993;
	var b = -0.48150981158021355;

	return (d > 30) ? 0 : Math.pow(d / a, 1 / b);
};

/**
 * Given the time t and depth d,
 * returns true if a dive is considered "warning".
 */
padi.isWarningDive = function(t, d) {
	return (d > this.calcMaximumDepth(t));
};

/**
 * Given the time t and depth d,
 * returns the pressure group of a dive.
 */
padi.calcPG = function(t, d) {
	var s = 2.2648834727001601E+160;
	var m = 7.0123592040257003;
	var n = 1.7946238745730789;
	var q = 552.85426276703538;
	var r = -20.363335715433173;
	var c = -1.0231048129283549;

	var a = (Math.log(t) - m) / n;
	var b = (Math.log(d) - q) / r;
	return s * Math.pow(Math.E, -0.5 * (a * a + b * b)) + c;
};

/**
 * Given the pressure group pg and surface interval i,
 * returns the reduced pressure group of a dive.
 */
padi.calcRPG = function(pg, i) {
	var s = 116.54299853808371;
	var m = 33.212036458693376;
	var n = -15.10250855396535;
	var q = -186.32853553152427;
	var r = 112.18008663409428;
	var c = 0.82154053080283274;

	var a = (pg - m) / n;
	var b = (i - q) / r;
	return s * Math.pow(Math.E, -0.5 * (a * a + b * b)) + c;
};

/**
 * Given the pressure group pg and reduced pressure group rpg,
 * returns the appropriate surface interval of a dive.
 */
padi.calcSIFromRPG = function(pg, rpg) {
	var s = 116.54299853808371;
	var m = 33.212036458693376;
	var n = -15.10250855396535;
	var q = -186.32853553152427;
	var r = 112.18008663409428;
	var c = 0.82154053080283274;

	var a = (rpg - c) / s;
	var b = (pg - m) / n;
	return r * Math.sqrt(-2 * Math.log(a) - b * b) + q;
};

/**
 * Given the reduced pressure group rpg and depth d of the next dive,
 * returns the RNT for the next dive.
 */
padi.calcRNT = function(rpg, d) {
	var c = 76.081117597706665;
	var m = 4.1581576427587992;
	var n = -19.592050053069073;
	var q = -0.5708514716494717;
	var r = 0.46114751660456582;

	var a = m * Math.log(rpg) + n * Math.log(d);
	var b = q * Math.log(rpg) + r * Math.log(d);
	return (c + a) / (1 + b);
};

/**
 * Given the RNT rnt and depth d of the next dive,
 * returns the reduced pressure group of a dive.
 */
padi.calcRPGFromRNT = function(rnt, d) {
	var c = 76.081117597706665;
	var m = 4.1581576427587992;
	var n = -19.592050053069073;
	var q = -0.5708514716494717;
	var r = 0.46114751660456582;

	var a = c - rnt + (n - rnt * r) * Math.log(d);
	var b = rnt * q - m;
	return Math.pow(Math.E, a / b);
};

module.exports = padi;
