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

var Settings = require('./settings.jsx');
var Help = require('./help.jsx');
var Export = require('./export.jsx');
var Import = require('./import.jsx');

var Dashboard = React.createClass({
	render: function() {
		return (
			<div>
				<Settings />
				<Help />
				<Export />
				<Import />
			</div>
		);
	}
});

module.exports = Dashboard;
