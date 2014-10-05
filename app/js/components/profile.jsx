var React = require('react');

var dive = require('./dive.jsx');
var icon = require('./icon.jsx');

var profile = React.createClass({
	addDive: function() {
		this.setProps({
			data: this.props.data.concat([{
				title: 'New Dive'
			}])
		});
	},
	removeDive: function() {
		this.setProps({
			data: this.props.data.slice(0, -1)
		});
	},
	render: function() {
		var dives = this.props.data.map(function(value, index) {
			return <dive key={index} title={value.title} />
		});
		var minus;
		if (this.props.data.length > 1) {
			minus = <icon name="minus" click={this.removeDive} />;
		}
		return (
			<div className="profile">
				{dives}
				<div className="plusminus">
					<icon name="plus" click={this.addDive} />
					<br />
					{minus}
				</div>
			</div>
		);
	}
});

module.exports = profile;
