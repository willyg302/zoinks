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
			onDoubleClick: emptyFunction,
			adjustDrag: function(pos) {
				return pos;
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
			onMouseDown: this._onMouseDown,
			onDoubleClick: this.props.onDoubleClick
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
		// Allow owners to adjust the drag if necessary
		var adjusted = this.props.adjustDrag({
			x: this.state.dragStartX + e.clientX,
			y: this.state.dragStartY + e.clientY
		});
		this.props.onDrag(adjusted);
	}
});

module.exports = Draggable;
