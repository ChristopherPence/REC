const fs = require('fs');
const imgur = require('imgur');
const https = require('https');
const express = require('express');
const parser = require("body-parser");
const request = require("request");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

const mongo = require('mongodb').mongoClient;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Load in env variables
require('dotenv').load();
const port = process.env.MAIN_PORT;

//Send html and static files upon request
app.use('/resources', express.static(__dirname + '/resources'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/login-register.html');
});
app.get('/upimg', function(req, res){
	res.sendFile(__dirname + '/upimg.html');
});


//=========================================
// Flyer uploading
/*  
    POST /flyerUpload
	DATA: 	imgsrc: image file

	Saves image as a file in /uploads
*/
app.use(parser.urlencoded({extended : true}));
app.post('/flyerUpload', upload.single('imgsrc'), function (req, res, next) {
	console.log('Image Upload:');
	console.log('    Client IP: ' + req.connection.remoteAddress);
	console.log('    File location: ' + req.file.path); //file name
	//console.log(req.body); other form fields

	res.redirect('/upimg'); //prevent form resubmission
});




// ========================================
// Imgur functions

//save the client id to the imgur module
imgur.setClientId(process.env.CLIENT_ID);
imgur.setAPIUrl('https://api.imgur.com/3/');

/*
	Upload an image to imgur and document it in database
	Will upload image to imgur and output the delhash, THIS MUST BE SAVED

	@return TRUE  if uploaded successfully
			FLASE if upload failed
*/
function imgurUpload(image){
	imgur.uploadFile(image).then(function(res){
		console.log('Delete Hash: '+res.data.deletehash);
		console.log('Link: '+res.data.link);
		return true;
	}).catch(function(err){
		console.log(err.message);
		return false;
	});
}
	
/*
	Delete an image from imgur and document it in database
	Will delete an image uploaded to imgur, nothing to save here

	@return TRUE if deleted
			FALSE if failure
*/
function imgurDelete(delhash){
	imgur.deleteImage(delhash).then(function(status){
		console.log(status);
		return true;
	}).catch(function(err){
		console.log(err.message);
		return false;
	});
}


//========================================
// MongoDB Connection for the Registration Page
app.post('/login', function (req, res, next)) {
  var userSchema = new Schema ({
    var username: req.username,
    var password: req.password
  }, {collection: 'userAccounts'});
         
  var userLogin = mongoose.model('findUser', userSchema);
  userLogin.find({}, function(err, data)) {
    if(err){
      console.log("Could not find account");
    }
    console.log(data);            
  }
}




//Server listen on port
app.listen(port, function(){
	console.log('Server started on port: ' + port)
});