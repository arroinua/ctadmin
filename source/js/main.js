const debug = require("debug");
const router = require("router");
const routes = require('routes');
const templates = require("templates");

// render sidebar menu
templates.getPartial('sidebar-menu')
.then(function(template) {
	debug.log('sidebar-menu partial: ', template);
	document.getElementById('sidebar-menu').innerHTML = template();
})
.catch(function(err) {
	debug.error(err);
});

// set default path if none of the routes was matched with url hash
router.defaultPath = '/dashboard';

// find and init the route
router.navigate();