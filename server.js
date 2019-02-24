const fs = require('fs');
const https = require('https');
const express = require('express');
const parser = require("body-parser");
const request = require("request");
const app = express();

//Load in env variables
require('dotenv').load();
const port = process.env.MAIN_PORT;

//Start the server
app.use('/resources', express.static(__dirname + '/resources'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/login-register.html');
});
app.listen(port, function(){
	console.log('Server started on port: ' + port)
});




//Make an image upload
var options = {
	'method' : 'POST',
	'hostname' : 'api.imgur.com',
	'path' : '/3/image',
	'headers' : {
		'Authorization': 'Client-ID ' + process.env.CLIENT_ID
	}
};

var req = https.request(options, function(res) {
	res.on('data', function(i){
		console.log(i.toString());
	}); 
});

// var postData = "https://raw.githubusercontent.com/ChristopherPence/REC/master/REC%20Flowchart.png";

// req.write(postData);
// req.end();