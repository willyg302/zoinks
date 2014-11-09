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
var merge = require('react/lib/merge');

var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip = require('react-bootstrap/Tooltip');

var ProfileStore = require('../stores/profile-store');
var ProfileActions = require('../actions/profile-actions');
var algo = require('../algo');
var utils = require('../utils');

var SurfaceInterval = React.createClass({
	getInitialState: function() {
		return merge({ editing: false }, utils.splitTime(this.props.time));
	},
	render: function() {
		var elem;
		if (this.state.editing) {
			elem = (
				<form className="form-inline" onSubmit={this._onSave}>
					<OverlayTrigger placement="top" overlay={<Tooltip>Hours</Tooltip>}>
						<Input type="number" value={this.state.h} min="0" max="5" onChange={this._onEditHours} />
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Minutes</Tooltip>}>
						<Input type="number" value={this.state.m} min="0" max="59" onChange={this._onEditMinutes} />
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Minimize Time</Tooltip>}>
						<Button bsStyle="warning" onClick={this._onClickMinimize}>&#9660;</Button>
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Save</Tooltip>}>
						<Button bsStyle="primary" type="submit">&#10004;</Button>
					</OverlayTrigger>
					<OverlayTrigger placement="top" overlay={<Tooltip>Cancel</Tooltip>}>
						<Button bsStyle="default" onClick={this._onCloseEdit}>&#10006;</Button>
					</OverlayTrigger>
				</form>
			);
		} else {
			elem = <span className="display" onClick={this._onOpenEdit}>{utils.getTimeString(this.props.time)}</span>;
		}
		return (
			<div className="surface-interval">
				{elem}
			</div>
		);
	},
	_onEditHours: function(e) {
		this.setState({
			h: parseInt(e.target.value)
		});
	},
	_onEditMinutes: function(e) {
		this.setState({
			m: parseInt(e.target.value)
		});
	},
	_onOpenEdit: function() {
		this.setState(merge({ editing: true }, utils.splitTime(this.props.time)));
	},
	_onCloseEdit: function() {
		this.setState({
			editing: false
		});
	},
	_onClickMinimize: function() {
		var minimized = algo.minimizeSurfaceInterval(ProfileStore.getProfile(), this.props.id);
		this.setState(utils.splitTime(Math.ceil(minimized)));
	},
	_onSave: function(e) {
		e.preventDefault();
		ProfileActions.updateSurfaceInterval(this.props.id, 60 * this.state.h + this.state.m);
		this._onCloseEdit();
		return false;
	}
});

module.exports = SurfaceInterval;
