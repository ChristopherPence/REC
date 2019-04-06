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
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");

		var doc = {
			type: data.type,
			name: data.name
		};

		dbo.collection('organizations').deleteOne(doc, function(err, result) {
			if (err) throw err;
			console.log("added organization");
			db.close();
		});
	});
}

exports.removeFlyer = function(data) {

}



/*
	Get the events that are occuring on a specified day from the database.

	date in the format 'month/day/short-year'
	callback (err, result)
		err = the err message from the database
		result = the resulting events from the database query
*/
exports.getDatesEvents = function(date, callback) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to database\t Listing events on " + date);
		var dbo = db.db("REC_database");
		dbo.collection('events').find({ date : date }).sort().toArray(function(err, result){
			if (err) callback(err, null);
			else callback(null, result);
			db.close();
		});
	});
}

exports.getFlyers = function(callback) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("REC_database");
		dbo.collection('events').find({}).sort(date: 1).toArray(function(err, result){
			if (err) callback(err, null);
			else callback(null, result);
			db.close();
		});
	});
}

exports.addFlyer = function(data) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");

		var doc = {
			date: data.date,
			takedown_date: data.takedown_date,
			event: data.event,
			imageid: data.imageid
		};

		dbo.collection('flyers').insertOne(doc, function(err, result) {
			if (err) throw err;
			console.log("added organization");
			db.close();
		});
	});
}


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

exports.countOrganizations = function(callback) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to database\t Listing organizations");
		var dbo = db.db("REC_database");
		dbo.collection('organizations').countDocuments({}, function(err, res) {
			if (err) callback(err, null);
			else callback(null, result);
			db.close();
		});
	});
}



// get today events
// create organization
// get current flyers
// create event
// create organization 
// list organizations


/*
	Add an array of events to the 'events' collection. 
	Update an already existing event or insert it if 
	it doesn't already exist. 

	data is an array of events in REC_database format
*/
exports.addEventAutomatic = function(data){
	//connect to the database
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("REC_database");
		console.log("Connected to database\t RPI Event Additions");
		var matched = 0; var inserts = 0;
		var total = data.length; var sofar = 0;
		//loop through the events and insert them into the database
		for(i in data){ 
			dbo.collection('events').updateOne({ event_id : data[i].event_id , date : data[i].date }, 
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
				//update the stats and close the connection if all of the events are added
				matched += result.matchedCount;
				inserts += result.upsertedCount;
				if(sofar == total - 1) endConnection();
				sofar++;
			});
		}
			
		//End the mongo connection and print update stats
		function endConnection(){
			db.close();
			console.log('Completed database op\t RPI Event Additions');
			console.log('\tMatched: ' + matched);
			console.log('\tInserts: ' + inserts);
		}
	});
}