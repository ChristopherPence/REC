const mongo = require('mongodb').MongoClient;
require('dotenv').load();
const mongo_url = process.env.MONGO_URL;


exports.addOrganization = function(data) {
	mongo.connect(mongo_url, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");

		var doc = {
			type: data.type,
			name: data.name,
			description: data.description,
			events: data.events,
			flyers: data.flyers
		};

		dbo.collection('organizations').insertOne(doc, function(err, result) {
			if (err) throw err;
			console.log("added organization");
		});
		db.close();

	});
}

exports.deleteOrganization = function(data) {

}

exports.removeFlyer = function(data) {

}

exports.addEvent = function(data) {

}

exports.getDatesEvents = function(date) {

}

exports.getFlyers = function() {

}

exports.addFlyer = function(data) {

}

exports.listOrganizations = function(pagenumber, offset) {
	mongo.connect(mongo_url, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");

		dbo.collection('organizations').find().sort().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		db.close();

	});
}


// get today events
// create organization
// get current flyers
// create event
// create organization 
// list organizations
