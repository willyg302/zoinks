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

var ModalIcon = require('./modal-icon.jsx');
var WatchProfileMixin = require('./watch-profile-mixin');

var Export = React.createClass({
	mixins: [WatchProfileMixin],

	render: function() {
		var modalBody = (
			<div>
				<pre>{JSON.stringify(this.state)}</pre>
				<p>Please copy the above string.</p>
			</div>
		);
		return (
			<ModalIcon name="export" desc="Export Dive Plan" modalBody={modalBody} primary="OK" />
		);
	}
});

module.exports = Export;
