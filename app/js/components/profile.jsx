var React = require('react');

var Dive = require('./dive.jsx');
var Icon = require('./icon.jsx');

var Profile = React.createClass({
	getInitialState: function() {
		return {
			dives: [{ title: 'My Dive' }]
		};
	},
	addDive: function() {
		this.setState({
			dives: this.state.dives.concat([{
				title: 'New Dive'
			}])
		});
		this.diveAdded = true;
	},
	removeDive: function() {
		this.setState({
			dives: this.state.dives.slice(0, -1)
		});
	},
	componentDidUpdate: function() {
		if (this.diveAdded) {
			// Scroll all the way to the right to see the new dive
			var profileDiv = document.getElementById('profile');
			profileDiv.scrollLeft = profileDiv.scrollWidth;
			this.diveAdded = false;
		}
	},
	render: function() {
		var dives = this.state.dives.map(function(value, index) {
			return <Dive key={index} title={value.title} />
		});
		var minus;
		if (this.state.dives.length > 1) {
			minus = <Icon name="minus" click={this.removeDive} position="left" desc="Remove Last Dive" />;
		}
		return (
			<div className="profile">
				{dives}
				<div className="plusminus">
					<Icon name="plus" click={this.addDive} position="left" desc="Add New Dive" />
					<br />
					{minus}
				</div>
			</div>
		);
	}
});

module.exports = Profile;
