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


var CHANGE_EVENT = 'change';

// Default profile on page load
var _profile = {
	units: 'feet',
	dives: [{
		id: 0,
		title: 'My Dive',
		depth: 50,
		time: 3
	}]
};


function addDive() {
	_profile.dives.push({
		id: _profile.dives.length,
		title: 'New Dive',
		depth: 50,
		time: 3
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
	}
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

module.exports = ProfileStore;
