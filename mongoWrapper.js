const mongo = require('mongodb').MongoClient;
require('dotenv').load();
const mongo_url = process.env.MONGO_URL;

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

exports.listOrganizations = (async (pagenumber, offset) => {
	let db = await mongo.connect(mongo_url,{ useNewUrlParser: true });
	let dbo = db.db('REC_database');
	try {
		const res = await dbo.collection('organizations').find().sort().skip((pagenumber - 1) * offset).limit(offset).toArray();
		console.log(res);
		return res;
	}
	finally {
		db.close();
	}
});

exports.countOrganizations = (async () => {
	let db = await mongo.connect(mongo_url,{ useNewUrlParser: true });
	let dbo = db.db('REC_database');
	try {
		const res = await dbo.collection('organizations').countDocuments({});
		console.log(res);
		return res;
	}
	finally {
		db.close();
	}
});


// get today events
// create organization
// get current flyers
// create event
// create organization 
// list organizations
