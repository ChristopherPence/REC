const fs = require('fs');
const express = require('express');
const parser = require("body-parser");
const request = require("request");
const app = express();

//Load in env variables
require('dotenv').load();
const port = process.env.MAIN_PORT;

app.use('/resources', express.static(__dirname + '/resources'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.listen(port, function{
	console.log('Server started on port: ' + port)
});