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

var Dive = React.createClass({
	render: function() {
		var x = this.props.time;
		var y = this.props.depth;
		var bt = (10 * x) + (y / 2);
		var w = bt + y + 94;
		var h = 10 * y + 64;
		var points = "0,0 {e},{f} {g},{f} {h},50 {i},50 {j},0";
		var replacements = {
			'{e}': y / 2,
			'{f}': 10 * y,
			'{g}': bt,
			'{h}': bt + y - 5,
			'{i}': bt + y + 25,
			'{j}': bt + y + 30
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
				<img className="boat" src="img/boat.svg" style={{left: '8px'}} />
				<img className="boat" src="img/boat.svg" style={{left: (w - 56) + "px"}} />
				<svg className="line" xmlns="http://www.w3.org/2000/svg" width={w} height={h}>
					<polyline style={style} transform="translate(32,32)" points={points} />
				</svg>
			</div>
		);
	},
	_onEditTitle: function(e) {
		ProfileActions.updateDiveTitle(this.props.id, e.target.value);
	}
});

module.exports = Dive;
