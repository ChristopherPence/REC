const saltRounds = 10;
const mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
require('dotenv').load();
const mongo_url = process.env.MONGO_URL;

exports.login = function(email, password, callback){
	mongo.connect(mongo_url, { useNewUrlParser: true }, function (err, db){
		if(err) throw err;
		else {
			console.log("Connected to database\t User Login");
			var dbo = db.db("REC_database");
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(password, salt, function(err, hash) {
					dbo.collection('userAccounts').find({"email": email}, {projections: {_id: 1}}).toArray(function(err, result) {
						if(err) throw err;
						bcrypt.compare(result.password, hash, function (err, response){
							if(response == true){
								console.log("Account found.");
								callback('Found');
							}
							else{
								console.log("Account not found.");
								callback('Not Found');
							}
							db.close();
						});
					});
				});               
			});
		}
	});
}

exports.register = function(){

}