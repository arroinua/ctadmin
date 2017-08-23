const config = require('./config');
const request = require('./request');
const debug = require('./debug');
const _template = require('lodash/template');
const cache = {};

module.exports = {
	get(name) {

		return request.get(config.templates+name+'.html')
		.then((tmp) => {
			let compiled = _template(tmp, {variable: 'data'});
			cache[name] = compiled;
			return compiled;
		})
		.catch(err => err);

	}
}