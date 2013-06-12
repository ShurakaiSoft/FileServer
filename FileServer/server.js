/**
 * Stream a static file via http.
 */

var fs = require('fs');

var port = 1337;
var filename = 'books.zip';
var contentType  = "application/zip";

require('http').createServer(function (req, res) {
	fs.exists('./' + filename, sendFile);
			
	function sendFile(file) {
		var stream = null;
		
		if (!file) {
			res.writeHead(401, {"Content-Type": "text/plain"});
			res.end("401, Permission Denied");
			return;
		}
		
		stream = fs.createReadStream('./' + filename);

		stream.on('error', function (err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.end("500, Internal Server Error");
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
}).listen(port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Server listening on', port);
	}
});