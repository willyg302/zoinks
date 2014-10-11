/** @jsx React.DOM */

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

var Alert = require('react-bootstrap/Alert');
var Input = require('react-bootstrap/Input');

var ProfileActions = require('../actions/profile-actions');

var ModalIcon = require('./modal-icon.jsx');

var Import = React.createClass({
	getInitialState: function() {
		return {
			valid: true
		};
	},
	render: function() {
		var alert;
		if (!this.state.valid) {
			alert = <Alert bsStyle="danger"><strong>Error!</strong> The imported data is not a valid dive plan.</Alert>;
		}
		var modalBody = (
			<div>
				{alert}
				<Input type="textarea" ref="input" />
				<p>Paste the dive plan data into the text field above.</p>
			</div>
		);
		return (
			<ModalIcon name="import" desc="Import Dive Plan" modalBody={modalBody} cancel="Cancel"
			           primary="Import" onClickPrimary={this._onClickImport} onOpen={this._onOpen} />
		);
	},
	_onClickImport: function() {
		var valid = ProfileActions.loadProfileFromString(this.refs.input.getValue());
		if (!valid) {
			this.setState({
				valid: false
			});
		}
		return valid;
	},
	_onOpen: function() {
		this.refs.input.getDOMNode().value = '';
		this.setState(this.getInitialState());
	}
});

module.exports = Import;
