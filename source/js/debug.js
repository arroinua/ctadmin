module.exports = { log, error, info };

function log(...args) {
	args.forEach( (l) => console.log(l) );
}

function error(...args) {
	args.forEach( (l) => console.error(l) );
}

function info(...args) {
	args.forEach( (l) => console.info(l) );
}