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

var Button = require('../../../node_modules/react-bootstrap/Button');
var Modal = require('../../../node_modules/react-bootstrap/Modal');
var OverlayMixin = require('../../../node_modules/react-bootstrap/OverlayMixin');

var Icon = require('./icon.jsx');

var ModalIcon = React.createClass({
	mixins: [OverlayMixin],

	getInitialState: function() {
		return {
			isModalOpen: false
		};
	},
	handleToggle: function() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	},
	handleOkFunction: function() {
		this.props.okFunction();
		this.handleToggle();
	},
	render: function() {
		return (
			<Icon name={this.props.name} click={this.handleToggle} position={this.props.position} desc={this.props.desc} />
		);
	},
	renderOverlay: function() {
		if (!this.state.isModalOpen) {
			return <span />;
		}
		var cancel;
		if (this.props.cancel) {
			cancel = <Button onClick={this.handleToggle}>{this.props.cancel}</Button>;
		}
		return (
			<Modal title={this.props.desc} onRequestHide={this.handleToggle}>
				<div className="modal-body">
					{this.props.modalBody}
				</div>
				<div className="modal-footer">
					{cancel}
					<Button bsStyle="primary" onClick={this.handleOkFunction}>{this.props.ok}</Button>
				</div>
			</Modal>
		);
	}
});

module.exports = ModalIcon;
