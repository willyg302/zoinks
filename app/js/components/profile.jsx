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

var Constants = require('../constants');
var ProfileActions = require('../actions/profile-actions');

var Dive = require('./dive.jsx');
var Icon = require('./icon.jsx');
var WatchProfileMixin = require('./watch-profile-mixin');

var Profile = React.createClass({
	mixins: [WatchProfileMixin],

	render: function() {
		var dives = this.state.dives.map(function(value, index) {
			return <Dive key={index} id={value.id} title={value.title} />;
		});
		var minus;
		if (this.state.dives.length > 1) {
			minus = <Icon name="minus" click={this._onRemoveDiveClick} position="left" desc="Remove Last Dive" />;
		}
		return (
			<div className="profile">
				{dives}
				<div className="plusminus">
					<Icon name="plus" click={this._onAddDiveClick} position="left" desc="Add New Dive" />
					<br />
					{minus}
				</div>
			</div>
		);
	},

	_onProfileChange: function(actionType) {
		if (actionType === Constants.DIVE_ADD) {
			// Scroll all the way to the right to see the new dive
			var profileDiv = document.getElementById('profile');
			profileDiv.scrollLeft = profileDiv.scrollWidth;
		}
	},
	_onAddDiveClick: function() {
		ProfileActions.addDive();
	},
	_onRemoveDiveClick: function() {
		ProfileActions.removeDive();
	}
});

module.exports = Profile;
