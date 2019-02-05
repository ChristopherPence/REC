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
	//read the file from the filesystem
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

var contin = 0;

function terminator()
{
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('$:', (killNode) => {
    // TODO: Log the answer in a database
    if(killNode == "k")
    {
      
      return process.kill(process.pid);
      console.log(`Terminated Node Server`);
    }
    else if(killNode == "help")
    {
      console.log(`Commands allowed:`);
      console.log(`k for killing the node server`);
      rl.close();
      terminator();
    }
    else if(killNode != "")
    {
      console.log(`Error: Type "help" for nessesary commands.`);
      rl.close();
      terminator();
    }
    else
    {
      rl.close();
      terminator();
    }
    rl.close();
  });
}

terminator();


///mnt/c/Users/pikef/documents/github/REC/examples