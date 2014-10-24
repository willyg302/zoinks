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
var React = require('react/addons');
var emptyFunction = require('react/lib/emptyFunction');

var Draggable = React.createClass({
	componentWillUnmount: function() {
		// Remove any leftover event handlers
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);
	},
	getDefaultProps: function() {
		return {
			onDrag: emptyFunction,
			validateDrag: function(pos) {
				return [true, true];
			}
		};
	},
	getInitialState: function() {
		return {
			dragging: false,
			dragStartX: 0,
			dragStartY: 0
		};
	},
	render: function() {
		return React.addons.cloneWithProps(React.Children.only(this.props.children), {
			style: {
				left: this.props.x,
				top: this.props.y
			},
			className: 'draggable',
			onMouseUp: this._onMouseUp,
			onMouseDown: this._onMouseDown
		});
	},
	_onMouseDown: function(e) {
		this.setState({
			dragging: true,
			dragStartX: this.props.x - e.clientX,
			dragStartY: this.props.y - e.clientY
		});
		document.addEventListener('mousemove', this._onMouseMove);
		document.addEventListener('mouseup', this._onMouseUp);
	},
	_onMouseUp: function(e) {
		this.setState({
			dragging: false
		});
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);
	},
	_onMouseMove: function(e) {
		if (!this.state.dragging) {
			return;
		}
		var newX = this.state.dragStartX + e.clientX;
		var newY = this.state.dragStartY + e.clientY;

		// Callback to validate the drag
		var validated = this.props.validateDrag(newX, newY);
		newX = validated[0] ? newX : this.props.x;
		newY = validated[1] ? newY : this.props.y;
		this.props.onDrag(newX, newY);
	}
});

module.exports = Draggable;
