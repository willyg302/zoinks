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

var Input = require('react-bootstrap/Input');

var ProfileActions = require('../actions/profile-actions');
var ProfileStore = require('../stores/profile-store');

var ModalIcon = require('./modal-icon.jsx');

var Settings = React.createClass({
	getInitialState: function() {
		return {
			units: ProfileStore.getProfile().units
		};
	},
	handleChange: function() {
		this.setState({
			units: this.refs.units.getValue()
		});
	},
	render: function() {
		var modalBody = (
			<div>
				<Input type="select" ref="units" value={this.state.units} label="Units" onChange={this.handleChange}
				       help="Choose whether to use feet or meters for depth units.">
					<option value="feet">Feet</option>
					<option value="meters">Meters</option>
				</Input>
			</div>
		);
		return (
			<ModalIcon name="settings" desc="Settings" modalBody={modalBody} cancel="Cancel"
			           primary="Save" onClickPrimary={this._onClickSave} onOpen={this._onOpen} />
		);
	},
	_onClickSave: function() {
		ProfileActions.changeProfileUnits(this.state.units);
		return true;
	},
	_onOpen: function() {
		this.setState(this.getInitialState());
	}
});

module.exports = Settings;
