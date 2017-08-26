var request = require('../request');

module.exports = {
	init(params) {
		console.log('trunks init');
		document.getElementById('container').innerHTML = params.template({ page: 'Trunk', oid: params.params.oid });
	}
};