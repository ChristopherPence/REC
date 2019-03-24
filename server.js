const fs = require('fs');
const imgur = require('imgur');
const https = require('https');
const express = require('express');
const parser = require("body-parser");
const request = require("request");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const bodyParser = require("body-parser");

// Support JSON-encoded bodies
app.use(bodyParser.json());

// Suppost URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Cool module that can add color to bash/terminal text
/*
  var goodColor = chalk.bold.red;
  console.log(goodColor("The text color is red."));
*/
const chalk = require('chalk');

const mongo = require('mongodb').MongoClient;

//Load in env variables
require('dotenv').load();
const port = process.env.MAIN_PORT;
const mongo_port = process.env.MONGO_PORT;

//Send html and static files upon request
app.use('/resources', express.static(__dirname + '/resources'));
app.use('/scripts', express.static(__dirname + '/scripts'));

//include the subfolder as a static point in which all the scripts can actually be referenced in the client side
app.use(express.static('public')); 

//send the webpage html to the user on localhost port 3000
app.get('/', function (req, res) 
{
  res.send(__dirname + '/public');
});
app.get('/upimg', function(req, res){
  res.sendFile(__dirname + '/upimg.html');
});

//send over the news
app.get('/getnews', function(req, res){

  
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
// MongoDB Connection for the Login Page
app.post('/login', function (req, res, next) {
           
  var URL = 'mongodb://localhost:' + mongo_port + '/';
    
  mongo.connect(URL, { useNewUrlParser: true }, function (err, db){
    if(err) {
      throw err;
    }
    else {
      console.log("Connected to database");

      var dbo = db.db("REC_database");
      
      var query = {
        username: req.body.username,
        password: req.body.password
      };

      dbo.collection('userAccounts').find(query).toArray(function(err, result) {
        if(err) {
          throw err;
        }
        
        if(result === undefined || result.length == 0){
          console.log("Account not found.");
          res.send("Not Found");
        }
        else{
          console.log("Account found.");
          res.send('Found');
        }
      });

      db.close();
    }
  });
});

//========================================
// MongoDB Connection for the Registration Page
app.post('/register', function(req, res, next) {
           
  var URL = 'mongodb://localhost:' + mongo_port + '/';
  
  mongo.connect(URL, { useNewUrlParser: true }, function (err, db){
    if(err) {
      throw err;
    }
    else {
      console.log("Connected to database");

      var dbo = db.db("REC_database");
      
      var document = {
        organization: req.body.organization,
        username: req.body.username,
        password: req.body.password,
        blurb: req.body.blurb
      };

      dbo.collection('userAccounts').insertOne(document, function(err, result){
        if(err) {
          throw err;
        }
        console.log("Account registered");
      });

      db.close();
    }
  });
         
});

//Server listen on port
app.listen(port, function(){
	console.log('Server started on port: ' + port)
});