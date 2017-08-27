var debug = require('debug');
var trunksApi = require('api/trunks');

module.exports = { init };

function init(params) {
	debug.log('trunk init');

	const oid = params.params.oid;
	const promise = oid ? trunksApi.getTrunk({ oid }) : trunksApi.getTrunk();

	promise
	.then(function(response) {
		debug.log('getTrunk:', response);
		render(params.template, response.result);
	})
	.catch(function(err) {
		debug.log('getTrunk: ', err);
	});

}

function render(template, data) {
	document.getElementById('content').innerHTML = template(data);
}