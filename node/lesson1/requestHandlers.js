 function start(response,postData) {
 	// console.log("Request handler 'start' was called.");
 	// sleep(10000);
 	// return "Hello Start"
 	var body = '<html>' +
 		'<head>' +
 		'<meta http-equiv="Content-Type" content="text/html; ' +
 		'charset=UTF-8" />' +
 		'</head>' +
 		'<body>' +
 		'<form action="/upload" method="post">' +
 		'<textarea name="text" rows="20" cols="60"></textarea>' +
 		'<input type="submit" value="Submit text" />' +
 		'</form>' +
 		'</body>' +
 		'</html>';

 	response.writeHead(200, {
 		"Content-Type": "text/html"
 	});
 	response.write(body);
 	response.end();
 }



 /************
 在node中除了代码，所有一切都是并行执行的?
 ***********/
 function sleep(milliSeconds) {
 	var startTime = new Date().getTime();
 	while (new Date().getTime() < startTime + milliSeconds);
 }



 function upload(response,postData) {
 	console.log("Request handler 'upload' was called.");
 	response.writeHead(200, {
 		"Content-Type": "text/plain"
 	});
 	response.write(postData);
 	response.end();
 }

 exports.start = start;
 exports.upload = upload;