//THIS IS AN EXAMPLE FROM W3 SCHOOLS, THIS IS NOT OUR OWN CODE
//Only part of this code is our own. We are using this file to learn
//We are using this to test how node.js works

//load the required modules
var express = require('express');         //  this requires the server to have the express module
var app = express();                      //  this creates the express app for use of creating the server
var http = require('http').Server(app);   //  require the http (protocol) for the server    
var fs = require('fs');                   //  require the fs node module for writing and creating a json file
var bodyParser = require("body-parser");  //  require a body parser for correctly obtaining the real data from the client side post
var stockData;                            //  this is the stock data that will be put into the json file for a more permanent storage
var port = 3000;                          //  this is the port the server will be hosted on


//print in the server console the directory (for my use)
console.log(__dirname);  
//include the subfolder as a static point in which all the scripts can actually be referenced in the client side
app.use(express.static('public')); 
//include the subfolder of node modules so that the client side can obtain the necessary scripts
app.use(express.static('node_modules'));

//send the webpage html to the user on localhost port 3000
app.get('/', function (req, res) 
{
  res.send(__dirname + '/public');
});

//server is listening on necessary port for client
var server = app.listen(port,function () 
{
  console.log(`App listening on port ${port}!`);
});

// start server on port 3000
http.listen(3000, function(){
  console.log('Server up on ' + port);
});















//var contin = 0;
//function terminator()
//{
//  const readline = require('readline');
//
//  const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//  });
//
//  rl.question('$:', (killNode) => {
//    // TODO: Log the answer in a database
//    if(killNode == "k")
//    {
//      
//      return process.kill(process.pid);
//      console.log(`Terminated Node Server`);
//    }
//    else if(killNode == "help")
//    {
//      console.log(`Commands allowed:`);
//      console.log(`k for killing the node server`);
//      rl.close();
//      terminator();
//    }
//    else if(killNode != "")
//    {
//      console.log(`Error: Type "help" for nessesary commands.`);
//      rl.close();
//      terminator();
//    }
//    else
//    {
//      rl.close();
//      terminator();
//    }
//    rl.close();
//  });
//}
//
//terminator();


///mnt/c/Users/pikef/documents/github/REC/examples