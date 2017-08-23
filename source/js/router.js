const templates = require("./templates");
const debug = require("./debug");

const Router = class {

	constructor() {
		this.routes = [];
		this.default = '';
		this.currentRoute = null;
		this.location = global.location;
		this.history = global.history;
		this.listen();
	}

	get route() {
		return this.currentRoute;
	}

	set defaultPath(value) {
		this.default = value;
	}

	on(path, view, handler) {
		let pattern = this.pathToPattern(path);
		this.routes.push({ path, view, handler, pattern });
		this.routes.sort(this.sortRoutes);
		return this;
	}

	navigate(path) {
		if(path) this.location.hash = path;
		else this.onChange();
	}

	onChange() {
		debug.log('onChange: ', this.routes);

		let path = global.location.hash.substr(1);
		let route = this.getRoutes(path)[0]; // get the first matched route

		if(!route) return this.toDefault();

		this.getTemplate(route.view)
		.then((template) => {
			route.template = template;
			route.params = this.getRouteParams(path, route.pattern);
			this.currentRoute = route;
			route.handler(route);
		});
		
	}

	toDefault() {
		this.navigate(this.default);
	}

	getRoutes(path) {
		return this.routes.filter(item => path.match(item.pattern.string));
	}

	getRouteParams(path, pattern) {		
		return path
		.match(pattern.string)
		.slice(1)
		.reduce((result, value, index) => {
			result[pattern.keys[index]] = value;
			return result;
		}, {});
	}

	getTemplate(view) {
		return templates.get(view);
	}

	pathToPattern(path) {
		let keys = [];
		let string = path.replace(/([:*])(\w+)/g, (full, dots, key) => {
			keys.push(key);
			return '([^\/]+)';
		}) + '(?:\/|$)'; // replace dynamic parts of the path (ex. ':id') and add non-capturing group at the end

		return { keys, string };
	}

	sortRoutes(a, b) {
		return (b.path.split('/').length) - (a.path.split('/').length);
	}

	listen() {
		global.addEventListener('hashchange', this.onChange.bind(this), false);
		return this;
	}

};

module.exports = new Router();