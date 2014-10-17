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

var Tooltip = require('react-bootstrap/Tooltip');

var ProfileActions = require('../actions/profile-actions');
var algo = require('../algo');
var utils = require('../utils');

var Draggable = require('./draggable.jsx');

var Dive = React.createClass({
	getInitialState: function() {
		return {
			depthStyle: 'success',
			timeStyle: 'success'
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
		var status = algo.getStatus(this.props);
		var statusColor = (status === algo.status.BAD ? '#ff5177' : (status === algo.status.WARNING ? '#ffd740' : '#5af158'));
		var statusImg = (status === algo.status.BAD ? 'bad' : (status === algo.status.WARNING ? 'warning' : 'good'));
		var style = {
			fill: 'none',
			stroke: statusColor,
			strokeWidth: '5px',
			strokeLinejoin: 'round'
		};
		var depthValue = utils.convertUnits(this.props.depth, 'meters', this.props.units).toFixed(1);
		var depthString = (this.props.units === 'meters' ? 'm' : 'ft');
		return (
			<div className="dive" style={{width: (w + 16) + "px"}}>
				<input className="form-control input-lg" onChange={this._onEditTitle} value={this.props.title} maxLength="140" />
				<div className="diagram">
					<img className="boat" src="img/boat.svg" />
					<img className="boat" src="img/boat.svg" style={{left: (w - 64) + "px"}} />
					<Draggable start={{x: bt, y: 10 * d}} validateDrag={this._validateDrag} onDrag={this._onDrag}>
						<img className="diver" src={"img/" + statusImg + ".svg"} />
					</Draggable>
					<Tooltip className="diver-tooltip" positionLeft={bt + 64} positionTop={10 * d}>
						{depthValue} {depthString}<br />
						{this.props.time.toFixed(1)} min
					</Tooltip>
					<Tooltip positionLeft={bt + d + 55} positionTop={69}>
						{utils.convertUnits(5, 'meters', this.props.units).toFixed(0)} {depthString}, 3 min
					</Tooltip>
					<svg xmlns="http://www.w3.org/2000/svg" width={w} height={h}>
						<polyline style={style} transform="translate(32,32)" points={points} />
					</svg>
				</div>
			</div>
		);
	},
	_onEditTitle: function(e) {
		ProfileActions.updateDiveTitle(this.props.id, e.target.value);
	},
	_onEditDepth: function(e) {
		ProfileActions.updateDiveDepth(this.props.id, this.refs.depth.getValue());
	},
	_onEditTime: function(e) {
		ProfileActions.updateDiveTime(this.props.id, this.refs.time.getValue());
	},
	_validateDrag: function(x, y) {
		var newDepth = y / 10;
		var newTime = (x - newDepth / 2) / 10;
		return [
			(newTime >= algo.MIN_TIME && newTime <= algo.MAX_TIME),
			(newDepth >= algo.MIN_DEPTH && newDepth <= algo.MAX_DEPTH)
		];
	},
	_onDrag: function(x, y) {
		var newDepth = y / 10;
		var newTime = (x - newDepth / 2) / 10;
		ProfileActions.updateDive(this.props.id, {
			depth: newDepth,
			time: newTime
		});
	}
});

module.exports = Dive;
