var React = require('react');

var dashboard = require('./components/dashboard.jsx');
var profile   = require('./components/profile.jsx');

React.renderComponent(profile(null), document.getElementById('profile'));
React.renderComponent(dashboard(null), document.getElementById('dashboard'));
