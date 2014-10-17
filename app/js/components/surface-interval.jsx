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

var ProfileActions = require('../actions/profile-actions');
var algo = require('../algo');
var utils = require('../utils');

var SurfaceInterval = React.createClass({
	render: function() {
		return (
			<div className="surface-interval">
				{utils.getTimeString(this.props.time)}
				<input type="range" onChange={this._onEditTime} value={this.props.time}
				       min={algo.MIN_SURFACE_INTERVAL} max={algo.MAX_SURFACE_INTERVAL} />
			</div>
		);
	},
	_onEditTime: function(e) {
		ProfileActions.updateSurfaceInterval(this.props.id, e.target.value);
	}
});

module.exports = SurfaceInterval;
