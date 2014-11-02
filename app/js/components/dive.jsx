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

var Button = require('react-bootstrap/Button');
var Popover = require('react-bootstrap/Popover');
var Tooltip = require('react-bootstrap/Tooltip');

var ProfileStore = require('../stores/profile-store');
var ProfileActions = require('../actions/profile-actions');
var algo = require('../algo');
var utils = require('../utils');

var Draggable = require('./draggable.jsx');

var Dive = React.createClass({
	getInitialState: function() {
		return {
			editing: false
		};
	},
	render: function() {
		var t = this.props.time;
		var d = this.props.depth;
		var bt = (10 * t) + (d / 2);
		var w = bt + d + 94;
		var h = 10 * d + 64;
		var points = "0,0 {e},{f} {g},{f} {h},50 {i},50 {j},0";
		var replacements = {
			'{e}': d / 2,
			'{f}': 10 * d,
			'{g}': bt,
			'{h}': bt + d - 5,
			'{i}': bt + d + 25,
			'{j}': bt + d + 30
		};
		for (var k in replacements) {
			if (replacements.hasOwnProperty(k)) {
				points = points.replace(new RegExp(k, 'g'), replacements[k]);
			}
		}
		var status = algo.getStatus(ProfileStore.getProfile(), this.props.id);
		var statusClass = (status === algo.status.BAD ? 'bad' : (status === algo.status.WARNING ? 'warning' : 'good'));
		var depthValue = utils.convertUnits(this.props.depth, 'meters', this.props.units).toFixed(1);
		var depthString = (this.props.units === 'meters' ? 'm' : 'ft');
		var editPopover;
		if (this.state.editing) {
			editPopover = (
				<Popover className="edit-dive" placement="right" positionLeft={bt + 60} positionTop={10 * d - 20}>
					<Button bsStyle="primary" onClick={this._onMaximizeDepth}>Maximize Depth</Button>
					<Button bsStyle="primary" onClick={this._onMaximizeTime}>Maximize Time</Button>
				</Popover>
			);
		}
		return (
			<div className="dive" style={{width: (w + 16) + "px"}}>
				<input className="form-control input-lg" onChange={this._onEditTitle} value={this.props.title} maxLength="140" />
				<div className="diagram">
					<img className="boat" src="img/boat.svg" />
					<img className="boat" src="img/boat.svg" style={{left: (w - 64) + "px"}} />
					<Draggable x={bt} y={10 * d} adjustDrag={this._adjustDrag} onDrag={this._onDrag}
					           onDoubleClick={this._onToggleEdit}>
						<img className="diver" src={"img/" + statusClass + ".svg"} />
					</Draggable>
					{editPopover}
					<Tooltip className="diver-tooltip" positionLeft={bt + 64} positionTop={10 * d}>
						{depthValue} {depthString}<br />
						{this.props.time.toFixed(1)} min
					</Tooltip>
					<Tooltip positionLeft={bt + d + 55} positionTop={69}>
						{utils.convertUnits(5, 'meters', this.props.units).toFixed(0)} {depthString}, 3 min
					</Tooltip>
					<svg xmlns="http://www.w3.org/2000/svg" width={w} height={h}>
						<polyline className={"dive-line " + statusClass} transform="translate(32,32)" points={points} />
					</svg>
				</div>
			</div>
		);
	},
	_onEditTitle: function(e) {
		ProfileActions.updateDiveTitle(this.props.id, e.target.value);
	},
	_onMaximizeDepth: function() {
		var maxDepth = algo.maximizeDepth(ProfileStore.getProfile(), this.props.id);
		ProfileActions.updateDiveDepth(this.props.id, maxDepth);
	},
	_onMaximizeTime: function() {
		var maxTime = algo.maximizeTime(ProfileStore.getProfile(), this.props.id);
		ProfileActions.updateDiveTime(this.props.id, maxTime);
	},
	_onToggleEdit: function() {
		this.setState({
			editing: !this.state.editing
		});
	},
	_adjustDrag: function(pos) {
		var y = Math.min(Math.max(pos.y, 10 * algo.MIN_DEPTH), 10 * algo.MAX_DEPTH);
		var x = Math.min(Math.max(pos.x, 10 * algo.MIN_TIME + y / 20), 10 * algo.MAX_TIME + y / 20);
		return {
			x: x,
			y: y
		};
	},
	_onDrag: function(pos) {
		var newDepth = pos.y / 10;
		var newTime = (pos.x - newDepth / 2) / 10;
		ProfileActions.updateDive(this.props.id, {
			depth: newDepth,
			time: newTime
		});
	}
});

module.exports = Dive;
