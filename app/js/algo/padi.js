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

var time = null; 
var depth = null;
var pressureGroup = null; 
var rnt = null; 

padi.badDive  = function(time, deptth) {
	var magicnumB = 105.4459074484564; 
	var magicnumA = −0.4334667424949577; 
	var powTimeBadDive = Math.pow(time, magicnumB); 

	depth = (magicnumA*powTimeBadDive); 

	if(depth > powTimeBadDive) {
		return true; 
	}
	else {
		return false; 
	}
}; 

padi.warningDive = function(time, depth) {
	var numA = 113.95854764967993; 
	var numB = −0.48150981158021355
	var poweTimeWarnDive = Math.pow(time, numB); 
	var minValue = Math.min(30, poweTimeWarnDive); 

	depth = (numA*poweTimeWarnDive); 

	if(depth > minValue) {
		return true; 
	}
	else {
		return false; 
	}
}; 

//TODO 
padi.pressureGroup = function(time, depth, pressureGroup) {
	//getting the pressure group?
	var s1 = (2.2648834727001601*Math.pow(10, 160)); 
	var m1 = 7.0123592040257003; 
	var n1 = 1.7946238745730789; 
	var q1 = 552.85426276703538; 
	var r1 = −20.363335715433173; 
	var c1 = −1.0231048129283549; 

	return pressureGroup; 
};

//TODO 
padi.reducePressureGroup = function() {
	//reducing pressure group 

	var s2 = 116.54299853808371; 
	var m2 = 33.212036458693376; 
	var n2 = −15.10250855396535; 
	var q2 = −186.32853553152427; 
	var r2 = 112.18008663409428; 
	var c2 = 0.82154053080283274; 
	return pressureGroup; 
};

//TODO 
padi.rnt = function() {
	var c3 = 76.081117597706665; 
	var m3 = 4.1581576427587992; 
	var n3 = −19.592050053069073; 
	var q3 = −0.5708514716494717; 
	var r3 = 0.46114751660456582; 
	return rnt; 

};
module.exports = padi;

