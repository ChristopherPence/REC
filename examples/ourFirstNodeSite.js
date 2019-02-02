//THIS IS AN EXAMPLE FROM W3 SCHOOLS, THIS IS NOT OUR OWN CODE
//We are using this to test how node.js works

//load the required modules
var http = require('http');
var url = require('url');
var fs = require('fs');

//create the server
http.createServer(function(req, res){
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	console.log(q.pathname);
	fs.readFile(filename, function(err, data){
		//If there was an error loading the file
		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});

	
}).listen(8080);