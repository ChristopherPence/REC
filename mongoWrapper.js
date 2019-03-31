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


exports.addEventAutomatic = function(data){
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to database\t Automatic Event Additions");
		var dbo = db.db("REC_database");
		for(i in data){
			dbo.collection('events').updateOne({ event_id : data[i].event_id }, 
				{$setOnInsert : {
					organizer : data[i].organizer,
					event_id : data[i].event_id,
					title : data[i].title,
					timeStart : data[i].timeStart,
					timeEnd : data[i].timeEnd,
					date : data[i].date,
					description : data[i].description  
				}}, {upsert:true}, function(err, result) {
				if (err) throw err;
			});
		}
		db.close();
	});
}