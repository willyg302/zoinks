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
'use strict';

jest.dontMock('../icon.jsx');

describe('Icon', function() {
	var TestUtils, mockFunction, icon;

	beforeEach(function() {
		var Icon = require('../icon.jsx');
		TestUtils = require('react/addons').addons.TestUtils;
		mockFunction = jest.genMockFunction();
		icon = TestUtils.renderIntoDocument(
			<Icon name="test" click={mockFunction} desc="Test Icon" />
		);
	});

	it('renders with the correct properties', function() {
		var svg = TestUtils.findRenderedDOMComponentWithTag(icon, 'object');
		expect(svg.getDOMNode().getAttribute('data')).toEqual('img/test.svg');
		var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
		expect(TestUtils.findRenderedComponentWithType(icon, OverlayTrigger).props.placement).toEqual('top');
	});

	it('calls the callback function when clicked', function() {
		var input = TestUtils.findRenderedDOMComponentWithClass(icon, 'icon');
		TestUtils.Simulate.click(input);
		expect(mockFunction.mock.calls.length).toBe(1);
	});
});
