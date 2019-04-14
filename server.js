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
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var cookieParser = require('cookie-parser');

//custom node modules
const cloud = require('./cloudinaryWrapper.js');
const rss = require('./rss.js');
const mgo = require('./mongoWrapper.js');
const auth = require('./authentication.js');

//Load .ENV variables
require('dotenv').config();
const port = process.env.MAIN_PORT || 3000;
const mongo_url = process.env.MONGO_URL;
const session_secret = process.env.SESSION_SECRET;
const session_age = parseInt(process.env.SESSION_AGE);

// Support JSON and URL encoded bodies
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cookieParser());

//secure sessions stored in mongodb
const store = new MongoDBStore({
  uri: mongo_url,
  databaseName: 'REC_database',
  collection : 'sessions'
});
app.use(session({
  secret : session_secret,
  store : store,
  resave : true,
  saveUninitialized : true,
  cookie: {
    maxAge : session_age
  }
}));
store.on('error', function(error){
  console.log(error);
});

//Send html and static files upon request
app.use(express.static(__dirname + '/public', {redirect : false}));

//Default GET request / not used
app.get('/', function (req, res) {
  console.log('default');
  // req.session.user = 'chris';
  // console.log(req.session);
  // res.send(__dirname + '/public');
  res.sendFile(__dirname + '/public/index.html');
});

//development REMOVE BEFORE RELEASE
app.get('/upimg', function(req, res){
  console.log(req.session);
  console.log(req.session.user);
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
app.post('/login', function (req, res, next) {
  auth.login(req.body.email, req.body.password, function(success, user,sendBack){
    if(success) res.cookie('user', user, { maxAge: session_age, httpOnly: false});
    res.send(sendBack);
  });
});

//========================================
// MongoDB Connection for the Registration Page
app.post('/register', upload.single('profilePic'), function(req, res, next) {
  auth.register(req.body.organization, req.body.email, req.body.password, req.body.blurb, req.file.path, function(result){
    res.send(result);
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

//example function call for future events
// mgo.getFutureEvents("4/3/19", 5, function(err, result) {
//   if (err) throw err;
//   console.log(result);
// });