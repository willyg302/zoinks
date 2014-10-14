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

function isFunction(fn) {
	return typeof fn === 'function';
}

function matchesSelector(el, selector) {
	if (isFunction(el.matches)) {
		return el.matches(selector);
	} else if (isFunction(el.webkitMatchesSelector)) {
		return el.webkitMatchesSelector(selector);
	} else if (isFunction(el.mozMatchesSelector)) {
		return el.mozMatchesSelector(selector);
	} else if (isFunction(el.msMatchesSelector)) {
		return el.msMatchesSelector(selector);
	} else if (isFunction(el.oMatchesSelector)) {
		return el.oMatchesSelector(selector);
	} else if (isFunction(el.webkitMatchesSelector)) {
		return el.webkitMatchesSelector(selector);
	}
}

var Draggable = React.createClass({
	componentWillUnmount: function() {
		// Remove any leftover event handlers
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);
	},

	getDefaultProps: function() {
		return {
			handle: null,
			grid: null,
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

		// Short circuit if handle was provided and selector doesn't match
		if (this.props.handle && !matchesSelector(e.target, this.props.handle)) {
			return;
		}
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

		// Optionally snap to grid
		if (Array.isArray(this.props.grid)) {
			newX = Math.abs(newX - this.state.clientX) >= this.props.grid[0] ? newX : this.state.clientX;
			newY = Math.abs(newY - this.state.clientY) >= this.props.grid[1] ? newY : this.state.clientY;
		}

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
