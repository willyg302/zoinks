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

var Settings = React.createClass({
	render: function() {
		var modalBody = (
			<div>
				// @TODO
				Settings body here.
			</div>
		);
		var ok = function() {};
		return (
			<ModalIcon position="top" name="settings" desc="Settings"
			           modalBody={modalBody} cancel="Cancel" ok="Save" okFunction={ok} />
		);
	}
});

module.exports = Settings;
