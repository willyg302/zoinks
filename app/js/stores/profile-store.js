/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var AppDispatcher = require('../dispatcher/app-dispatcher');
var Constants = require('../constants');
var utils = require('../utils');
var algo = require('../algo');


var CHANGE_EVENT = 'change';

// Default profile on page load (minus a dive we will push on startup)
var _profile = {
	units: 'meters',
	dives: []
};


function addDive() {
	_profile.dives.push({
		id: _profile.dives.length,
		title: 'New Dive',
		depth: algo.DEFAULT_DEPTH,
		time: algo.DEFAULT_TIME
	});
}

function removeDive() {
	if (_profile.dives.length === 1) {
		return;
	}
	_profile.dives.pop();
}

function updateDive(id, delta) {
	_profile.dives[id] = merge(_profile.dives[id], delta);
}

function changeProfileUnits(units) {
	_profile.units = units;
}

function loadProfile(profile) {
	_profile = profile;
}

function validateProfile(profile) {
	var valid = utils.validate(profile, {
		units: function(e) {
			return ['feet', 'meters'].indexOf(e) !== -1;
		},
		dives: [{
			id: 'number',
			title: 'string',
			depth: function(e) {
				return e >= algo.MIN_DEPTH && e <= algo.MAX_DEPTH;
			},
			time: function(e) {
				return e >= algo.MIN_TIME && e <= algo.MAX_TIME;
			}
		}]
	});
	if (!valid) {
		return false;
	}
	for (var i = 0; i < profile.dives.length; i++) {
		if (profile.dives[i].id !== i) {
			return false;
		}
	}
	return true;
}


var ProfileStore = merge(EventEmitter.prototype, {
	getProfile: function() {
		return _profile;
	},
	emitChange: function(actionType) {
		this.emit(CHANGE_EVENT, actionType);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	validateProfile: validateProfile
});

// Register to handle all updates from the dispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case Constants.DIVE_ADD:
			addDive();
			break;
		case Constants.DIVE_REMOVE:
			removeDive();
			break;
		case Constants.DIVE_UPDATE:
			updateDive(action.id, action.delta);
			break;
		case Constants.PROFILE_CHANGE_UNITS:
			changeProfileUnits(action.units);
			break;
		case Constants.PROFILE_LOAD:
			loadProfile(action.profile);
			break;
		default:
			return true;
	}

	// Trigger a UI change after handling the action
	ProfileStore.emitChange(action.actionType);

	return true;
});

// Add a single dive to start with
addDive();

module.exports = ProfileStore;
