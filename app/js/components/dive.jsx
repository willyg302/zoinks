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

var Dive = React.createClass({
	onEditTitle: function(e) {
		this.setProps({
			title: e.target.value
		});
	},
	render: function() {
		return (
			<div className="dive">
				<h3><input onChange={this.onEditTitle} value={this.props.title} maxLength="140" /></h3>
			</div>
		);
	}
});

module.exports = Dive;
