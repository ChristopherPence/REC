const saltRounds = 10;
const mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;

// Logging into the server
exports.login = function(email, password, callback){
  mongo.connect(mongo_url, { useNewUrlParser: true }, function (err, db){
    if(err) throw err;
    else {
      console.log("Connected to database.");
      var dbo = db.db("REC_database");
      dbo.collection('userAccounts').find({"email": email}, {projections: {_id: 1}}).toArray(function(err, result) {
        if(err) throw err;
        if(result.length == 0) callback(false, null, null, "Not Found");
        bcrypt.compare(password, result[0].password, function (err, response){
          if(response == true){
            console.log("Account found.");
            callback(true, result[0].email, result[0].organization,'Found');
          }
          else{
            console.log("Account not found.");
            callback(false,null,null,"Not Found");
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
      
      dbo.collection('userAccounts').find({"email": newEmail}, {projections: {_id: 1}}).toArray(function(err, result) {
        if(err) throw err;
        console.log(result);
        if(result.length != 0){
          console.log("Email already exists. Please try something else.");
          callback("Register Problem");
          db.close();
          return false;
        }
        else {
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
  });
}