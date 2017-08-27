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
			let response = null;
			try {
				response = JSON.parse(xhr.responseText);
			} catch(err) {
				response = xhr.responseText;
			}
			if(response.error) reject( response.error );
			else resolve( response );
		};
		xhr.onerror = () => { reject( xhr.statusText ) };
		
		xhr.open(method, url);

		if(json) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(json);
		}
		else xhr.send();
	});
}