/**
 * Zoinks SCUBA Dive Planner Project for ICS 414.
 *
 * DISCLAIMER: This system is a PROTOTYPE and should NOT be used to plan real dives!
 *
 * @author William Gaul, Micah Ruth Angeles
 * @repository https://github.com/willyg302/zoinks
 * @license MIT
 */
var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {

	/**
	 * These actions come from a view element (user input, UI, etc.).
	 */
	handleViewAction: function(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
});

module.exports = AppDispatcher;
