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

// @TODO: This must validate the imported JSON on click
// Have a state variable, if it's not valid, display an error message

var Import = React.createClass({
	render: function() {
		var modalBody = (
			<div>
				// @TODO
				Import body here.
			</div>
		);
		var ok = function() {};
		return (
			<ModalIcon position="top" name="import" desc="Import Dive Plan"
			           modalBody={modalBody} cancel="Cancel" ok="Import" okFunction={ok} />
		);
	}
});

module.exports = Import;
