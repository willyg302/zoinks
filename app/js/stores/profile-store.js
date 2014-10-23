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
var tv4 = require('tv4');

var AppDispatcher = require('../dispatcher/app-dispatcher');
var Constants = require('../constants');
var algo = require('../algo');


var CHANGE_EVENT = 'change';

// JSON Schema v4 of a profile (http://json-schema.org/)
var PROFILE_SCHEMA = {
	type: 'object',
	properties: {
		units: {
			type: 'string',
			enum: ['feet', 'meters']
		},
		dives: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					title: {
						type: 'string',
						maxLength: 140
					},
					depth: {
						type: 'number',
						minimum: algo.MIN_DEPTH,
						maximum: algo.MAX_DEPTH
					},
					time: {
						type: 'number',
						minimum: algo.MIN_TIME,
						maximum: algo.MAX_TIME
					}
				},
				required: ['title', 'depth', 'time']
			},
			minItems: 1
		},
		surfaceIntervals: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					time: {
						type: 'number',
						minimum: algo.MIN_SURFACE_INTERVAL,
						maximum: algo.MAX_SURFACE_INTERVAL
					}
				},
				required: ['time']
			}
		}
	},
	required: ['units', 'dives', 'surfaceIntervals']
};

var DIVE_TEMPLATE = {
	title: 'New Dive',
	depth: algo.DEFAULT_DEPTH,
	time: algo.DEFAULT_TIME
};

var SURFACE_INTERVAL_TEMPLATE = {
	time: algo.DEFAULT_SURFACE_INTERVAL
};


// Default profile on page load
var _profile = {
	units: 'meters',
	dives: [DIVE_TEMPLATE],
	surfaceIntervals: []
};


function addDive() {
	_profile.dives.push(DIVE_TEMPLATE);
	_profile.surfaceIntervals.push(SURFACE_INTERVAL_TEMPLATE);  // Also add a surface interval
}

function removeDive() {
	if (_profile.dives.length === 1) {
		return;
	}
	_profile.dives.pop();
	_profile.surfaceIntervals.pop();
}

function updateDive(id, delta) {
	_profile.dives[id] = merge(_profile.dives[id], delta);  // Let's be immutable
}

function updateSurfaceInterval(id, time) {
	_profile.surfaceIntervals[id] = merge(_profile.surfaceIntervals[id], {time: time});  // Let's be immutable
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
	},
	validateProfile: function(profile) {
		return tv4.validateMultiple(profile, PROFILE_SCHEMA);
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
		case Constants.SURFACE_INTERVAL_UPDATE:
			updateSurfaceInterval(action.id, action.time);
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
