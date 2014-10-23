/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var React = require('react');

var ProfileStore = require('../stores/profile-store');

var WatchProfileMixin = {
	getInitialState: function() {
		return ProfileStore.getProfile();
	},
	componentDidMount: function() {
		ProfileStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
	},

	/**
	 * Event handler for change events coming from the ProfileStore.
	 */
	_onChange: function(actionType) {
		this.setState(ProfileStore.getProfile(), function() {
			if (typeof this._onProfileChange === 'function') {
				this._onProfileChange(actionType);
			}
		});
	}
};

module.exports = WatchProfileMixin;
