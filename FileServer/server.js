/**
 * Stream a static file via http, with simple security challenge.
 * 
 * 
 */

var fs = require('fs');
var url = require('url');

var port = 1337;
var filename = './books.zip';
var contentType  = "application/zip";

require('http').createServer(function (req, res) {
	requestedFilename = '';

	function sendError() {
		res.writeHead(500, {"Content-Type": "text/plain"});
		res.end("500, Internal Server Error");
	}
	
	function sendFile(file) {
		var stream = null;
		
		if (!file) {
			sendError();
			return;
		}
		stream = fs.createReadStream(filename);
		stream.on('error', function (err) {
			sendError();
			return;
		}).on('open', function () {
			console.log("Serving:", filename);
			res.setHeader('Content-disposition', 'attachment; filename=' + filename);
			res.writeHead(200, {"Content-Type": contentType});
		}).on('readable', function (data) {
			res.write(stream.read(), 'binary');
		}).on('end', function (err) {
			res.end();
		});
	}

	requestedFilename = '.' + url.parse(req.url).pathname;
	if (requestedFilename === filename) {
		sendFile(filename);
	} else {
		console.log("Security challenge failed: request for: '%s' from: %s", requestedFilename, req.connection.remoteAddress);
		res.writeHead(401, {'Content-Type': 'text/plain'});
		res.end("Forbidden: invalid file request.");
	}
}).listen(port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Server listening on', port);
	}
});