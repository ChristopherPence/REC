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
			flyers: data.flyers,
			img_url: data.img_url
		};

		dbo.collection('organizations').insertOne(doc, function(err, result) {
			if (err) throw err;
			console.log("added organization");
			db.close();
		});
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

// exports.listOrganizations = (async (pagenumber, offset) => {
// 	let db = await mongo.connect(mongo_url,{ useNewUrlParser: true });
// 	let dbo = db.db('REC_database');
// 	try {
// 		const res = await dbo.collection('organizations').find().sort().skip((pagenumber - 1) * offset).limit(offset).toArray();
// 		console.log(res);
// 		return res;
// 	}
// 	finally {
// 		db.close();
// 	}
// });

exports.listOrganizations = function(pagenumber, offset, callback) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to database\t Listing organizations");
		var dbo = db.db("REC_database");
		dbo.collection('organizations').find().sort().skip((pagenumber - 1) * offset).limit(offset).toArray(function(err, result){
			if (err) callback(err, null);
			else callback(null, result);
			db.close();
		});
	});
}

exports.countOrganizations = (async () => {
	let db = await mongo.connect(mongo_url,{ useNewUrlParser: true });
	let dbo = db.db('REC_database');
	try {
		const res = await dbo.collection('organizations').countDocuments({});
		//console.log(res);
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


/*
	Add an event to the 'events' collection. Update an already existing event
	or insert it if it doesn't already exist.

	data is one event in REC_database format
	callback (matched, updated, inserts)
		matched = how many events matched ones in the database
		updated = how many events contained old information
		inserts = how many events were inserted into the database
*/
exports.addEventAutomatic = function(data, callback){
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("REC_database");
		//insert the event
		dbo.collection('events').updateOne({ event_id : data.event_id , date : data.date }, 
			{$setOnInsert : {
				organizer : data.organizer,
				event_id : data.event_id,
				title : data.title,
				timeStart : data.timeStart,
				timeEnd : data.timeEnd,
				date : data.date,
				description : data.description  
			}}, {upsert:true}, function(err, result) {
			if (err) throw err;
			//close the database and send the callback
			db.close();
			callback(result.matchedCount, result.modifiedCount, result.upsertedCount);
		});
	});
}