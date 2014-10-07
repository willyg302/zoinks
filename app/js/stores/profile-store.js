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
		title: 'My Dive'
	}]
};


function addDive() {
	_profile.dives.push({
		id: _profile.dives.length,
		title: 'New Dive'
	});
}

function removeDive() {
	_profile.dives.pop();
}

function updateDiveTitle(id, title) {
	_profile.dives[id].title = title;
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
		case Constants.DIVE_UPDATE_TITLE:
			updateDiveTitle(action.id, action.title);
			break;
		default:
			return true;
	}

	// Trigger a UI change after handling the action
	ProfileStore.emitChange(action.actionType);

	return true;
});

/*
	DIVE_UPDATE_DEPTH: null,
	DIVE_UPDATE_TIME: null,
	PROFILE_CHANGE_UNITS: null,
	PROFILE_LOAD: null
*/

module.exports = ProfileStore;
