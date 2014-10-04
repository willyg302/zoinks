var React = require('react');

var profile = require('./components/profile.jsx');


var data = [
	{
		title: 'Dive 1'
	},
	{
		title: 'Dive 2'
	}
];

React.renderComponent(profile({data: data}), document.getElementById('content'));
