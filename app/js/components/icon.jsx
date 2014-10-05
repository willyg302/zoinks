var React = require('react');

var icon = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		this.props.click();
	},
	render: function() {
		return (
			<a href="#" className="icon" onClick={this.handleClick}>
				<object data={"img/" + this.props.name + ".svg"} type="image/svg+xml"></object>
			</a>
		);
	}
});

module.exports = icon;
