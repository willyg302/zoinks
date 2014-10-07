/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var AppDispatcher = require('../dispatcher/app-dispatcher');
var Constants = require('../constants');

var ProfileActions = {
	addDive: function() {
		AppDispatcher.handleViewAction({
			actionType: Constants.DIVE_ADD
		});
	},
	removeDive: function() {
		AppDispatcher.handleViewAction({
			actionType: Constants.DIVE_REMOVE
		});
	},
	updateDiveTitle: function(id, title) {
		AppDispatcher.handleViewAction({
			actionType: Constants.DIVE_UPDATE_TITLE,
			id: id,
			title: title
		});
	},
	updateDiveDepth: function(id, depth) {
		AppDispatcher.handleViewAction({
			actionType: Constants.DIVE_UPDATE_DEPTH,
			id: id,
			depth: depth
		});
	},
	updateDiveTime: function(id, time) {
		AppDispatcher.handleViewAction({
			actionType: Constants.DIVE_UPDATE_TIME,
			id: id,
			time: time
		});
	},
	changeProfileUnits: function(units) {
		AppDispatcher.handleViewAction({
			actionType: Constants.PROFILE_CHANGE_UNITS,
			units: units
		});
	},
	loadProfile: function(profile) {
		AppDispatcher.handleViewAction({
			actionType: Constants.PROFILE_LOAD,
			profile: profile
		});
	}
};

module.exports = ProfileActions;
