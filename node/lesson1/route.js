function route(handle,pathname,res,postData) {
	console.log('About  a route a request for %s', pathname)
	if (typeof handle[pathname] === 'function') {
		return handle[pathname](res,postData);
	} else {
		console.log("No request handler found for " + pathname);
		return "404 Not Found"
	}
}

exports.route = route