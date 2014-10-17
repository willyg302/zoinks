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
var ProfileStore = require('../stores/profile-store');

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
	updateDive: function(id, delta) {
		AppDispatcher.handleViewAction({
			actionType: Constants.DIVE_UPDATE,
			id: id,
			delta: delta
		});
	},
	updateSurfaceInterval: function(id, time) {
		AppDispatcher.handleViewAction({
			actionType: Constants.SURFACE_INTERVAL_UPDATE,
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
	},

	updateDiveTitle: function(id, title) {
		this.updateDive(id, {title: title});
	},
	updateDiveDepth: function(id, depth) {
		this.updateDive(id, {depth: depth});
	},
	updateDiveTime: function(id, time) {
		this.updateDive(id, {time: time});
	},

	/**
	 * Attempts to load a profile from a string, with validation checks.
	 * Returns true if the profile was loaded, false otherwise.
	 */
	loadProfileFromString: function(s) {
		try {
			var json = JSON.parse(s);
			var valid = ProfileStore.validateProfile(json);
			if (valid) {
				this.loadProfile(json);
			}
			return valid;
		} catch (e) {
			return false;
		}
	}
};

module.exports = ProfileActions;
