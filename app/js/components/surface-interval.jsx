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

var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');

var ProfileActions = require('../actions/profile-actions');
var algo = require('../algo');
var utils = require('../utils');

var SurfaceInterval = React.createClass({
	getInitialState: function() {
		return {
			editing: false
		};
	},
	render: function() {
		var elem;
		if (this.state.editing) {
			elem = (
				<form className="form-inline" onSubmit={this._onSave}>
					<OverlayTrigger ref="h" placement="top" overlay={<Tooltip>Hours</Tooltip>}>
						<Input type="number" defaultValue={Math.floor(this.props.time / 60)} min="0" max="5" />
					</OverlayTrigger>
					<OverlayTrigger ref="m" placement="top" overlay={<Tooltip>Minutes</Tooltip>}>
						<Input type="number" defaultValue={this.props.time % 60} min="0" max="59" />
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Minimize Time</Tooltip>}>
						<Button bsStyle="warning" onClick={this._onClickMinimize}>&#9660;</Button>
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Save</Tooltip>}>
						<Button bsStyle="primary" type="submit">&#10004;</Button>
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Cancel</Tooltip>}>
						<Button bsStyle="default" onClick={this._onClickCancel}>&#10006;</Button>
					</OverlayTrigger>
				</form>
			);
		} else {
			elem = <span className="display" onClick={this._onClickToEdit}>{utils.getTimeString(this.props.time)}</span>;
		}
		return (
			<div className="surface-interval">
				{elem}
			</div>
		);
	},
	_onClickToEdit: function(e) {
		this.setState({
			editing: true
		});
	},
	_onClickMinimize: function(e) {
		// @TODO
	},
	_onSave: function(e) {
		e.preventDefault();
		var h = parseInt(this.refs.h.getDOMNode().querySelector('.form-control').value);
		var m = parseInt(this.refs.m.getDOMNode().querySelector('.form-control').value);
		ProfileActions.updateSurfaceInterval(this.props.id, 60 * h + m);
		this.setState({
			editing: false
		});
		return false;
	},
	_onClickCancel: function(e) {
		this.setState({
			editing: false
		});
	}
});

module.exports = SurfaceInterval;
