var http = require('http'),
	url = require('url');


function start(route, handle) {
	function onRequest(req, res) {
		console.log('Request received!!!')

		var pathname = url.parse(req.url).pathname

		req.setEncoding("utf8");
		var postData = ''
		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" +
				postDataChunk + "'.");
		});

		req.addListener("end", function() {
			route(handle, pathname, res, postData)
		});



	}

	http.createServer(onRequest).listen(8888);

}

exports.start = start