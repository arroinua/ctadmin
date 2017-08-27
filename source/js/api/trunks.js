const config = require('config');
const debug = require('debug');
const request = require('request-module');
const serverUrl = config.serverUrl;

module.exports = {
	getTrunks(params = {}) { 
		return request.post(serverUrl, { method: 'getTrunks', params });
	},
	getTrunk(params = {}) { 
		return request.post(serverUrl, { method: 'getTrunk', params });
	}
};