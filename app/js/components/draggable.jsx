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
			start: {
				x: 0,
				y: 0
			},
			onDrag: emptyFunction,
			validateDrag: function(pos) {
				return [true, true];
			}
		};
	},
	getInitialState: function() {
		return {
			dragging: false,
			startX: 0,
			startY: 0,
			offsetX: 0,
			offsetY: 0,
			clientX: this.props.start.x,
			clientY: this.props.start.y
		};
	},
	render: function() {
		var style = {
			top: this.state.clientY,
			left: this.state.clientX
		};
		return React.addons.cloneWithProps(React.Children.only(this.props.children), {
			style: style,
			className: 'draggable',
			onMouseUp: this._onMouseUp,
			onMouseDown: this._onMouseDown
		});
	},

	_onMouseDown: function(e) {
		var node = this.getDOMNode();

		this.setState({
			dragging: true,
			offsetX: e.clientX,
			offsetY: e.clientY,
			startX: parseInt(node.style.left, 10) || 0,
			startY: parseInt(node.style.top, 10) || 0
		});

		// Add event handlers
		document.addEventListener('mousemove', this._onMouseMove);
		document.addEventListener('mouseup', this._onMouseUp);
	},
	_onMouseUp: function(e) {
		if (!this.state.dragging) {
			return;
		}
		this.setState({
			dragging: false
		});

		// Remove event handlers
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);
	},
	_onMouseMove: function(e) {
		var newX = this.state.startX + e.clientX - this.state.offsetX;
		var newY = this.state.startY + e.clientY - this.state.offsetY;

		// Callback to validate the drag
		var validated = this.props.validateDrag(newX, newY);
		this.setState({
			clientX: validated[0] ? newX : this.state.clientX,
			clientY: validated[1] ? newY : this.state.clientY
		}, function() {
			this.props.onDrag(this.state.clientX, this.state.clientY);
		});
	}
});

module.exports = Draggable;
