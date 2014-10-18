/** @jsx React.DOM */

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
				<TabPane key={1} tab="The Basics">
					<div className="help-basic">
						<img src="img/good.svg" />
						<h3>Good</h3>
						It is safe to dive.
					</div>
					<div className="help-basic">
						<img src="img/warning.svg" />
						<h3>Warning</h3>
						You are approaching the safety limits, but it is still safe to dive.
					</div>
					<div className="help-basic">
						<img src="img/bad.svg" />
						<h3>Bad</h3>
						Plan exceeds the safety limits. <strong>Do not dive!</strong>
					</div>
				</TabPane>
				<TabPane key={2} tab="Dive Profile">This is the dive profile tab.</TabPane>
				<TabPane key={3} tab="Calculations">Info about algorithms and stuff.</TabPane>
				<TabPane key={4} tab="About">
					<p>
						SCUBA Dive Planner Project for ICS 414, by William Gaul and Micah Ruth Angeles.
						The source code for Zoinks can be found at
						our <a href="https://github.com/willyg302/zoinks">GitHub repository</a>,
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
