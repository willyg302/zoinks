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

var utils = require('../utils');

var ModalIcon = require('./modal-icon.jsx');
var WatchProfileMixin = require('./watch-profile-mixin');

var Help = React.createClass({
	mixins: [WatchProfileMixin],

	getDepthString: function(depth) {
		return utils.convertUnits(depth, 'meters', this.state.units).toFixed(0) + " " + this.state.units;
	},
	render: function() {
		var REPO_URL = 'https://github.com/willyg302/zoinks';
		var PADI_URL = 'http://elearning.padi.com/company0/tools/RDP%20InsforUseMet.pdf';
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
				<TabPane key={2} tab="Dive Profile">
					<p>
						Drag the <strong>diver</strong> around to modify your dive depth and time,
						or double-click it to enter values manually. You can also click on the
						title to edit the name of your dive.
					</p>
					<p>
						Click on a <strong>surface interval</strong> to edit it. This is the amount of
						time you spend on the surface between dives.
					</p>
					<p>
						The <strong>plane</strong> shows how long you must wait before it is safe to fly.
					</p>
				</TabPane>
				<TabPane key={3} tab="Calculations">
					<p>
						Calculations are based on the <a href={PADI_URL}>PADI Recreational Dive Planner Table</a>.
						In addition, to simplify the dive planning process we have assumed the following:
					</p>
					<ul>
						<li>A descent rate of {this.getDepthString(20)} per minute</li>
						<li>An ascent rate of {this.getDepthString(10)} per minute (you should <i>never</i> ascend faster than this)</li>
						<li>A safety stop, for 3 minutes at {this.getDepthString(5)}, for all dives</li>
					</ul>
				</TabPane>
				<TabPane key={4} tab="About">
					<p>
						SCUBA Dive Planner Project for ICS 414, by William Gaul and Micah Ruth Angeles.
						The source code for Zoinks can be found at our <a href={REPO_URL}>GitHub repository</a>,
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
