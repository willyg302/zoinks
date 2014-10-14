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

var Draggable = require('./draggable.jsx');

var Dive = React.createClass({
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
		var style = {
			fill: 'none',
			stroke: 'red',
			strokeWidth: '5px',
			strokeLinejoin: 'round'
		};
		return (
			<div className="dive">
				<input className="form-control input-lg" onChange={this._onEditTitle} value={this.props.title} maxLength="140" />
				<div className="diagram">
					<img className="boat" src="img/boat.svg" />
					<img className="boat" src="img/boat.svg" style={{left: (w - 64) + "px"}} />
					<Draggable start={{x: bt, y: 10 * d}}
					           validateDrag={this._validateDrag} onDrag={this._onDrag}>
						<img className="diver" src="img/good.svg" />
					</Draggable>
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
			depth: Math.round(newDepth),
			time: Math.round(newTime)
		});
	}
});

module.exports = Dive;
