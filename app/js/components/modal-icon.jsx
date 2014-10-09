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
var Modal = require('react-bootstrap/Modal');
var OverlayMixin = require('react-bootstrap/OverlayMixin');

var Icon = require('./icon.jsx');

var ModalIcon = React.createClass({
	mixins: [OverlayMixin],

	getInitialState: function() {
		return {
			isModalOpen: false
		};
	},
	render: function() {
		return (
			<Icon name={this.props.name} click={this._onOpenModal} position={this.props.position} desc={this.props.desc} />
		);
	},
	renderOverlay: function() {
		if (!this.state.isModalOpen) {
			return <span />;
		}
		var cancel;
		if (this.props.cancel) {
			cancel = <Button onClick={this._onClickCancel}>{this.props.cancel}</Button>;
		}
		return (
			<Modal title={this.props.desc} onRequestHide={this._onCloseModal}>
				<div className="modal-body">
					{this.props.modalBody}
				</div>
				<div className="modal-footer">
					{cancel}
					<Button bsStyle="primary" onClick={this._onClickPrimary}>{this.props.primary}</Button>
				</div>
			</Modal>
		);
	},
	_onOpenModal: function() {
		this.setState({
			isModalOpen: true
		}, function() {
			if (typeof this.props.onOpen === 'function') {
				this.props.onOpen();
			}
		});
	},
	_onCloseModal: function() {
		this.setState({
			isModalOpen: false
		}, function() {
			if (typeof this.props.onClose === 'function') {
				this.props.onClose();
			}
		});
	},
	_onClickCancel: function() {
		if (typeof this.props.onClickCancel === 'function') {
			this.props.onClickCancel();
		}
		this._onCloseModal();
	},
	_onClickPrimary: function() {
		if (typeof this.props.onClickPrimary === 'function') {
			if (!this.props.onClickPrimary()) {
				return;
			}
		}
		this._onCloseModal();
	}
});

module.exports = ModalIcon;
