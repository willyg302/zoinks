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

var dashboard = require('./components/dashboard.jsx');
var profile   = require('./components/profile.jsx');

React.renderComponent(profile(null), document.getElementById('profile'));
React.renderComponent(dashboard(null), document.getElementById('dashboard'));
