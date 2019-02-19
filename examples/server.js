//THIS IS AN EXAMPLE FROM W3 SCHOOLS, THIS IS NOT OUR OWN CODE
//Only part of this code is our own. We are using this file to learn
//We are using this to test how node.js works

//load the required modules
const http = require('http');
const url = require('url');
const fs = require('fs');

const parser = require("body-parser");
const request = require("request");
const express = require('express');
const app = express();
const port = 8080;

//Allow access to the static files folder
app.use('/static', express.static(__dirname + '/static'));

//Send index.html on default page load
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Open the app to listen on the proper port
app.listen(port, function(){
  console.log('REC app listening on port ' + port);
})

//listen for a post request
app.use(parser.urlencoded({extended : true}));
app.post('/', function(req, res){
  //determin what kind of post request we are making

})

//OLD code

/*//create the server
http.createServer(function(req, res){
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
  //check for blank url
  if(q.pathname == "/"){
    fs.readFile("./index.html", function(err, data){
      //If there was an error loading the file
      if(err){
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
      });
  }
	//or read the specified file from the system
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
}).listen(8080);*/

/*var contin = 0;







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

terminator();*/


///mnt/c/Users/pikef/documents/github/REC/examples