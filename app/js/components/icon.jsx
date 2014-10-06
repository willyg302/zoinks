var React = require('react');

var OverlayTrigger = require('../../../node_modules/react-bootstrap/OverlayTrigger');
var Tooltip = require('../../../node_modules/react-bootstrap/Tooltip');

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