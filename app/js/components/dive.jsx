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
		return (
			<div className="dive">
				<h3><input onChange={this._onEditTitle} value={this.props.title} maxLength="140" /></h3>
			</div>
		);
	},
	_onEditTitle: function(e) {
		ProfileActions.updateDiveTitle(this.props.id, e.target.value);
	}
});

module.exports = Dive;
