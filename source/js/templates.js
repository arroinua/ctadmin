const config = require('config');
const request = require('request-module');
const debug = require('debug');
const _template = require('lodash/template');
const templatesCache = {};
const partialsCache = {};

function promiseCache(cache) {
	return new Promise((resolve, reject ) => {
		resolve(cache);
	});
}

module.exports = {
	get(name) {
		if(templatesCache[name]) return promiseCache(templatesCache[name]);

		return request.get(config.templatesPath+name+'.html')
		.then((tmp) => {
			let compiled = _template(tmp, {variable: 'data'});
			templatesCache[name] = compiled;
			return compiled;
		})
		.catch(err => err);

	},

	getPartial(name) {
		if(partialsCache[name]) return promiseCache(partialsCache[name]);

		return request.get(config.partialsPath+name+'.html')
		.then((tmp) => {
			let compiled = _template(tmp, {variable: 'data'});
			partialsCache[name] = compiled;
			return compiled;
		})
		.catch(err => err);

	}
};