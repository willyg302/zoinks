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

var Help = React.createClass({
	render: function() {
		var modalBody = (
			<div>
				// @TODO
				Help text here.
			</div>
		);
		var ok = function() {};
		return (
			<ModalIcon position="top" name="help" desc="Help"
			           modalBody={modalBody} ok="Got It!" okFunction={ok} />
		);
	}
});

module.exports = Help;
