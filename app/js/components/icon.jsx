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

var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');

var Icon = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		this.props.click();
	},
	render: function() {
		var tooltip = <Tooltip>{this.props.desc}</Tooltip>;
		return (
			<OverlayTrigger placement={this.props.position} overlay={tooltip}>
				<a href="#" className="icon" onClick={this.handleClick}>
					<object data={"img/" + this.props.name + ".svg"} type="image/svg+xml"></object>
				</a>
			</OverlayTrigger>
		);
	}
});

module.exports = Icon;
