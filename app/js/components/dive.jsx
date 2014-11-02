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
var Modal = require('react-bootstrap/Modal');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Tooltip = require('react-bootstrap/Tooltip');

var ProfileStore = require('../stores/profile-store');
var ProfileActions = require('../actions/profile-actions');
var algo = require('../algo');
var utils = require('../utils');

var Draggable = require('./draggable.jsx');

var Dive = React.createClass({
	mixins: [OverlayMixin],

	getInitialState: function() {
		return {
			editing: false,
			editDepth: this.props.depth,
			editTime: this.props.time
		};
	},
	render: function() {
		var t = this.props.time;
		var d = this.props.depth;
		var bt = (10 * t) + (d / 2);
		var w = bt + d + 94;
		var h = 10 * d + 64;
		var points = "0,0 {e},{f} {g},{f} {h},50 {i},50 {j},0";
		var replacements = {
			'{e}': d / 2,
			'{f}': 10 * d,
			'{g}': bt,
			'{h}': bt + d - 5,
			'{i}': bt + d + 25,
			'{j}': bt + d + 30
		};
		for (var k in replacements) {
			if (replacements.hasOwnProperty(k)) {
				points = points.replace(new RegExp(k, 'g'), replacements[k]);
			}
		}
		var status = algo.getStatus(ProfileStore.getProfile(), this.props.id);
		var statusClass = (status === algo.status.BAD ? 'bad' : (status === algo.status.WARNING ? 'warning' : 'good'));
		var depthValue = utils.convertUnits(this.props.depth, 'meters', this.props.units).toFixed(1);
		var depthString = (this.props.units === 'meters' ? 'm' : 'ft');
		return (
			<div className="dive" style={{width: (w + 16) + "px"}}>
				<input className="form-control input-lg" onChange={this._onEditTitle} value={this.props.title} maxLength="140" />
				<div className="diagram">
					<img className="boat" src="img/boat.svg" />
					<img className="boat" src="img/boat.svg" style={{left: (w - 64) + "px"}} />
					<Draggable x={bt} y={10 * d} adjustDrag={this._adjustDrag} onDrag={this._onDrag}
					           onDoubleClick={this._onOpenModal}>
						<img className="diver" src={"img/" + statusClass + ".svg"} />
					</Draggable>
					<Tooltip className="diver-tooltip" positionLeft={bt + 64} positionTop={10 * d}>
						{depthValue} {depthString}<br />
						{this.props.time.toFixed(1)} min
					</Tooltip>
					<Tooltip positionLeft={bt + d + 55} positionTop={69}>
						{utils.convertUnits(5, 'meters', this.props.units).toFixed(0)} {depthString}, 3 min
					</Tooltip>
					<svg xmlns="http://www.w3.org/2000/svg" width={w} height={h}>
						<polyline className={"dive-line " + statusClass} transform="translate(32,32)" points={points} />
					</svg>
				</div>
			</div>
		);
	},
	renderOverlay: function() {
		if (!this.state.editing) {
			return <span />;
		}
		return (
			<Modal title={"Edit " + this.props.title} onRequestHide={this._onCloseModal}>
				<form onSubmit={this._onClickSave}>
					<div className="modal-body">
						<Input type="number" value={this.state.editDepth} onChange={this._onEditDepth}
						       min={algo.MIN_DEPTH} max={algo.MAX_DEPTH} />
						<Input type="number" value={this.state.editTime} onChange={this._onEditTime}
						       min={algo.MIN_TIME} max={algo.MAX_TIME} />
					</div>
					<div className="modal-footer">
						<Button onClick={this._onCloseModal}>Cancel</Button>
						<Button bsStyle="primary" type="submit">Save</Button>
					</div>
				</form>
			</Modal>
		);
	},
	_onOpenModal: function() {
		this.setState({
			editing: true,
			editDepth: this.props.depth,
			editTime: this.props.time
		});
	},
	_onCloseModal: function() {
		this.setState({
			editing: false
		});
	},
	_onClickSave: function(e) {
		e.preventDefault();
		ProfileActions.updateDive(this.props.id, {
			depth: this.state.editDepth,
			time: this.state.editTime
		});
		this._onCloseModal();
		return false;
	},
	_onEditTitle: function(e) {
		ProfileActions.updateDiveTitle(this.props.id, e.target.value);
	},
	_onEditDepth: function(e) {
		this.setState({
			editDepth: parseInt(e.target.value)
		});
	},
	_onEditTime: function(e) {
		this.setState({
			editTime: parseInt(e.target.value)
		});
	},
	_adjustDrag: function(pos) {
		var y = Math.min(Math.max(pos.y, 10 * algo.MIN_DEPTH), 10 * algo.MAX_DEPTH);
		var x = Math.min(Math.max(pos.x, 10 * algo.MIN_TIME + y / 20), 10 * algo.MAX_TIME + y / 20);
		return {
			x: x,
			y: y
		};
	},
	_onDrag: function(pos) {
		var newDepth = pos.y / 10;
		var newTime = (pos.x - newDepth / 2) / 10;
		ProfileActions.updateDive(this.props.id, {
			depth: newDepth,
			time: newTime
		});
	}
});

module.exports = Dive;
