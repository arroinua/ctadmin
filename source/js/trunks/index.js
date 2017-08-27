var debug = require('debug');
var trunksApi = require('api/trunks');

module.exports = { init };

function init(params) {
	debug.log('trunks init');

	trunksApi.getTrunks()
	.then(function(response) {
		debug.log('getTrunks:', response);
		render(params.template, response.result);
	})
	.catch(function(err) {
		debug.error('getTrunks: ', err);
	});

}

function render(template, data) {
	document.getElementById('content').innerHTML = template(data);
}