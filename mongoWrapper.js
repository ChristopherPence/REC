const mongo = require('mongodb').MongoClient;
require('dotenv').load();
const mongo_url = process.env.MONGO_URL;


function copy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}

exports.addOrganization = function(data) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
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
	page = new Array();
	mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");

		dbo.collection('organizations').find().sort().skip((pagenumber - 1) * offset).limit(offset).toArray(function(err, result) {
			if (err) throw err;
			page = copy(result);

		});
		db.close();

	});
	return page;
}

exports.countOrganizations = function() {
	var numorgs = 0;
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");

		dbo.collection('organizations').countDocuments({}, function(err, result) {
			if (err) throw err;
			numorgs = result;

		});
		db.close();

	});
	return numorgs;
}


// get today events
// create organization
// get current flyers
// create event
// create organization 
// list organizations
