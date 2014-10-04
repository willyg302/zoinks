var React = require('react');

var dive = require('./dive.jsx');

var profile = React.createClass({
	render: function() {
		var dives = this.props.data.map(function(value, index) {
			return <dive key={index} title={value.title} />
		});
		return (
			<div className="profile">
				{dives}
			</div>
		);
	}
});

module.exports = profile;
