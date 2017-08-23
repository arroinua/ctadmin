module.exports = { get, post };

function get(url, data) {
	return send('GET', url, data);
}

function post(url, data) {
	return send('POST', url, data);
}

function send(method, url, data) {
	let json = data ? JSON.stringify(data) : null;
	
	return new Promise((resolve, reject ) => {
		let xhr = new XMLHttpRequest();
		xhr.onload = () => { 
			let result = (method === 'POST' && xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.responseText;
			if(result.error) reject( result.error );
			else resolve( result );
		};
		xhr.onerror = () => { reject( xhr.statusText ) };
		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		if(json) xhr.send(json);
		else xhr.send();
	});
}