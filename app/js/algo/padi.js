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
	return pressureGroup; 
}

//TODO 
padi.reducePressureGroup = function() {
	return pressureGroup; 
}

module.exports = padi;

