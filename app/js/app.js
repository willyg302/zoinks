var React = require('react');

var dashboard = require('./components/dashboard.jsx');
var profile   = require('./components/profile.jsx');


React.renderComponent(profile({data: [
	{
		title: 'My Dive'
	}
]}), document.getElementById('profile'));

React.renderComponent(dashboard({icons: [
	{name: 'settings'},
	{name: 'help'},
	{name: 'save'},
	{name: 'load'}
]}), document.getElementById('dashboard'));
