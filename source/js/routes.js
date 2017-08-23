const router = require('./router');
const debug = require('./debug');

router
.on('/dashboard', 'dashboard', function(params) {
	debug.log('dashboard route: ', params);
	document.getElementById('container').innerHTML = params.template({ page: 'Dashboard' });
})
.on('/trunk/:oid', 'trunk', function(params) {
	debug.log('trunk route: ', params);
	document.getElementById('container').innerHTML = params.template({ page: 'Trunk', oid: params.params.oid });
})
.on('/trunk/:type/:kind/:oid', 'trunk', function(params) {
	debug.log('trunk route: ', params);
	document.getElementById('container').innerHTML = params.template({ page: 'Trunk', oid: params.params.oid, kind: params.params.kind, type: params.params.type });
});