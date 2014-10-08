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

var ModalIcon = require('./modal-icon.jsx');

var Export = React.createClass({
	getInitialState: function() {
		return ProfileStore.getProfile();
	},
	componentDidMount: function() {
		ProfileStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
	},
	render: function() {
		var modalBody = (
			<div>
				<pre>{JSON.stringify(this.state)}</pre>
				<p>Please copy the above string.</p>
			</div>
		);
		var ok = function() {};
		return (
			<ModalIcon position="top" name="export" desc="Export Dive Plan"
			           modalBody={modalBody} ok="OK" okFunction={ok} />
		);
	},
	_onChange: function(actionType) {
		this.setState(ProfileStore.getProfile());
	}
});

module.exports = Export;
