var React = require('react');

var icon = require('./icon.jsx');

var dashboard = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.icons.map(function(i, index) {
					return <icon key={index} name={i.name} />
				})}
			</div>
		);
	}
});

module.exports = dashboard;
