//node modules
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const parser = require("body-parser");
const request = require("request");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const mongo = require('mongodb').MongoClient;

//custom node modules
const cloud = require('./cloudinaryWrapper.js');
const rss = require('./rss.js');
const mgo = require('./mongoWrapper.js');
const auth = require('./authentication.js');

//Load .ENV variables
require('dotenv').load();
const port = process.env.MAIN_PORT;
const mongo_url = process.env.MONGO_URL;

// Support JSON and URL encoded bodies
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

//Send html and static files upon request
app.use('/resources', express.static(__dirname + '/resources'));
app.use('/scripts', express.static(__dirname + '/scripts'));
//allow the user to access static files
app.use(express.static('public'));

//Default GET request
app.get('/', function (req, res) {
  res.send(__dirname + '/public');
});
app.get('/upimg', function(req, res){
  res.sendFile(__dirname + '/upimg.html');
});

//GET requests for specific data
app.get('/getnews', function({query : {page = 1, size = 20, search = ""}}, res){
  //rss.getEvents();
  var today = new Date();
  var formattedDate = (today.getMonth() + 1) + '/' + today.getDay() + '/' + (today.getFullYear().toString().substring(2));
  mgo.getDatesEvents(formattedDate, function(err, result){
    res.send(result);
  });
});
app.get('/getclubs', function({query : {page = 1, size = 20, search = ""}}, res){
  mgo.listOrganizations(parseInt(page), parseInt(size), function(err, result) {
    res.send(result);
  });
});

//=========================================
// Flyer uploading
app.post('/flyerUpload', upload.single('imgsrc'), function (req, res, next) {
  console.log("attempting to upload");
  mgo.addFlyer(req.file.path, req.body, function(added) {
    console.log("entered mgo");
    if (added) {
      fs.unlink(req.file.path, function(err){
        if (err) throw err;
      });
      res.redirect('/upimg'); //prevent form resubmission
    }
  });


});

//========================================
// MongoDB Connection for the Login Page

app.post('/login', function ({body : {email = '', password = ''}}, res, next) {
  console.log();
  auth.login(email, password, function(result){
    res.send(result);
  });
});

//========================================
// MongoDB Connection for the Registration Page
const saltRounds = 10;
app.post('/register', function(req, res, next) {
  mongo.connect(mongo_url, { useNewUrlParser: true }, function (err, db){
    if(err) {
      throw err;
    }
    
    else {
      console.log("Connected to database");

      var dbo = db.db("REC_database");
      
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) throw err;
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if(err) throw err;

          var document = {
            organization: req.body.organization,
            email: req.body.email,
            password: hash,
            blurb: req.body.blurb
          };
          
          dbo.collection('userAccounts').insertOne(document, function(err, result){
            if(err) {
              throw err;
            }
            console.log("Account registered");
            res.send("Registered");
          });
          
          db.close();
        });
      });
    }
  });
         
});

//Server listen on port
app.listen(port, function(){
	console.log('Server started on port: ' + port)
});

/*****/
//test add organization to mongo db
// const mw = require('./mongoWrapper.js');
// var testdata = {type: "club", name: "Weightlifting", description: "Deadlift", events: ["Meet 1", "Meet 2"], flyers: []};
// mw.addOrganization(testdata);

// console.log("here");
// mgo.countOrganizations(function(err, res) {
//   console.log(res);
// });
//console.log(mgo.listOrganizations(1, 5));

/*mgo.addOrganization({
  type:"club",
  name:"SASE",
  description:"Society of Asian Scientists and Engineers",
  events:"[]",
  flyers:"[]",
  img_url:"resources/clubs/SASE/SASELogo.png"
});*/

// Cool module that can add color to bash/terminal text
/*
  var goodColor = chalk.bold.red;
  console.log(goodColor("The text color is red."));
*/