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

var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');

var ModalIcon = require('./modal-icon.jsx');

var Help = React.createClass({
	render: function() {
		var modalBody = (
			// @TODO
			<TabbedArea defaultActiveKey={1}>
				<TabPane key={1} tab="The Basics">This is the basics tab.</TabPane>
				<TabPane key={2} tab="Calculations">Info about algorithms and stuff.</TabPane>
				<TabPane key={3} tab="About">
					<p>
						SCUBA Dive Planner Project for ICS 414, by William Gaul and Micah Ruth Angeles.
						The source code for Zoinks can be found <a href="https://github.com/willyg302/zoinks">here</a>,
						licensed under the MIT License.
					</p>
					<p>
						Please remember that <strong>this system is a PROTOTYPE and should NOT be used to
						plan real dives</strong>. If you are looking for a dive computer, we recommend purchasing
						a commercial alternative.
					</p>
				</TabPane>
			</TabbedArea>
		);
		return (
			<ModalIcon name="help" desc="Help" modalBody={modalBody} primary="Got It!" />
		);
	}
});

module.exports = Help;
