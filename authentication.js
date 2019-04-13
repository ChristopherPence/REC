const saltRounds = 10;
const mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;

// Logging into the server
exports.login = function(email, password, callback){
  mongo.connect(mongo_url, { useNewUrlParser: true }, function (err, db){
    if(err) {
      throw err;
    }
    
    else {
      console.log("Connected to database.");

      var dbo = db.db("REC_database");
    
      dbo.collection('userAccounts').find({"email": email}, {projections: {_id: 1}}).toArray(function(err, result) {
        if(err) {
          throw err;
        }

        bcrypt.compare(password, result[0].password, function (err, response){
          if(response == true){
            console.log("Account found.");
            callback('Found');
          }
          else{
            console.log("Account not found.");
            callback("Not Found");
          }
        });
      });

      db.close();
    }
  });
}

// Registering to the server
exports.register = function(newOrganization, newEmail, newPassword, newBlurb, callback){
  mongo.connect(mongo_url, { useNewUrlParser: true }, function (err, db){
    if(err) {
      throw err;
    }
    
    else {
      console.log("Connected to database.");

      var dbo = db.db("REC_database");
      
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) throw err;
        bcrypt.hash(newPassword, salt, function(err, hash) {
          if(err) throw err;

          var document = {
            organization: newOrganization,
            email: newEmail,
            password: hash,
            blurb: newBlurb
          };
          
          dbo.collection('userAccounts').insertOne(document, function(err, result){
            if(err) {
              throw err;
            }
            console.log("Account registered.");
            callback("Registered");
          });
          
          db.close();
        });
      });
    }
  });
}