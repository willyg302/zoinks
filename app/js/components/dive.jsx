var React = require('react');

var dive = React.createClass({
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

module.exports = dive;
