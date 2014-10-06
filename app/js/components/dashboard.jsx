var React = require('react');

var ModalIcon = require('./modal-icon.jsx');

var Dashboard = React.createClass({
	render: function() {
		var modalBody = <span>Hey there!</span>;
		var ok = function() {};
		return (
			<div>
				<ModalIcon position="top" name="settings" desc="Settings"
				           modalBody={modalBody} cancel="Cancel" ok="Save" okFunction={ok} />
				<ModalIcon position="top" name="help" desc="Help"
				           modalBody={modalBody} ok="Got It!" okFunction={ok} />
				<ModalIcon position="top" name="save" desc="Export Dive Plan"
				           modalBody={modalBody} ok="OK" okFunction={ok} />
				<ModalIcon position="top" name="load" desc="Import Dive Plan"
				           modalBody={modalBody} cancel="Cancel" ok="Import" okFunction={ok} />
			</div>
		);
	}
});

module.exports = Dashboard;
