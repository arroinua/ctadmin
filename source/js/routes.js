const router = require('router');
const debug = require('debug');

router
.on('/dashboard', 'dashboard', function(params) {
	debug.log('dashboard route: ', params);
	document.getElementById('content').innerHTML = params.template({ page: 'Dashboard' });
})
.on('/trunks', 'trunks', function(params) {
	debug.log('trunk route: ', params);
	require('./trunks/').init(params);
})
.on('/trunk/:oid', 'trunk', function(params) {
	debug.log('trunk route: ', params);
	require('./trunks/single').init(params);
});