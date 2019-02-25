const fs = require('fs');
const imgur = require('imgur');
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





//save the client id to the imgur module
imgur.setClientId(process.env.CLIENT_ID);
imgur.setAPIUrl('https://api.imgur.com/3/');

/*
	Upload a flyer to imgur and document it in database
	Will upload image to imgur and output the delhash, THIS MUST BE SAVED
*/
function uploadFlyer(image){
	imgur.uploadFile(image).then(function(res){
		console.log('Delete Hash: '+res.data.deletehash);
		console.log('Link: '+res.data.link);
	}).catch(function(err){
		console.log(err.message);
	});
}
	
/*
	Delete a flyer from imgur and document it in database
	Will delete an image uploaded to imgur, nothing to save here
*/
function deleteFlyer(delhash){
	imgur.deleteImage(delhash).then(function(status){
		console.log(status);
	}).catch(function(err){
		console.log(err.message);
	});
}
	
