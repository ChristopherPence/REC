const mongo = require('mongodb').MongoClient;
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;

/*
Function to add an organization into database:
	Adds into the organizations collection
	data field should be a json object with the following fields:
		type, name, description, events, flyers, social, img_url
	Will throw error if insertion fails
*/
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
			social: data.social,
			img_url: data.img_url
		};

		dbo.collection('organizations').insertOne(doc, function(err, result) {
			if (err) throw err;
			console.log("added organization");
			db.close();
		});
	});
}

/*
Function to delete an organization from the database
	data parameter is a json object with fields:
		type and name
	These fields are used to identify the organization to delete in the 
	database. If the organization is found, it is deleted
*/
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

/*
Remove a flyer from the database
	Uses the cloud wrapper to delete the flyer by providing the appropraite 
	public_id. Data is a json object that has public_id associated
	with the flyer to delete.
*/
exports.removeFlyer = function(data) {
	const clo = require('./cloudinaryWrapper.js');
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to MongoAtlas Database");
		var dbo = db.db("REC_database");
		clo.delete(data.public_id, function(deleted) {
			if (deleted) {
				dbo.collection('flyers').deleteOne({public_id: data.public_id}, function(err, result) {
					if (err) throw err;
					console.log("deleted flyer");
					db.close();
				});
			}
		});
	});
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

/*
This function returns all flyers in the database. They 
are sorted by date and returned in the callback funtion as an array
*/
exports.getFlyers = function(callback) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("REC_database");
		dbo.collection('flyers').find({}).sort({date: 1}).toArray(function(err, result){
			if (err) callback(err, null);
			else callback(null, result);
			db.close();
		});
	});
}

/*
Function to add a flyer into the database
	Uses cloud wrapper to add 
	Parameters: imagePath is the path to the image
	data is a json object of information to be added
	callback function is used to display success or failure
	Calls the cloud wrappper to upload the image based on the path
		The returned public id and url are stored in the document
*/
exports.addFlyer = function(imagePath, data, callback) {
	const clo = require('./cloudinaryWrapper.js');
	console.log(imagePath);
	clo.upload(imagePath, function(added, iurl, ipid) {
		console.log("entered cloud");
		console.log(added);
		if (added) {
			mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
				if (err) throw err;
				console.log("Connected to MongoAtlas Database");
				var dbo = db.db("REC_database");

				var doc = {
					date: data.date,
					takedown_date: data.takedown_date,
					event: data.event,
					url: iurl,
					public_id: ipid
				};

				dbo.collection('flyers').insertOne(doc, function(err, result) {
					if (err) throw err;
					console.log("added flyer");
					callback(true);
					db.close();
				});
			});
		}
		else callback(false);
	});
}

/*
This function lists all of the organizations based on the input
Parameters: 
	pagenumber: Starting at page 1, this will give the documents for the p
		pagenumber specified
	offset: offset number are displayed on each page.
		To make pages of 5 orgs, listOrganizations(2, 5, callback) would 
			return the second set of 5.
The resulting query is returned in a callback function
*/
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

/*
This function returns the amount of organization documents
in the database.
 The returned amount is returned in a callback
*/
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

/*
Returns an array of events
	Events start at the given date
	The amount of events returned can be limiited by the 
	amount paramater.
	Example: getFutureEvents(today, 20, callback) will return
	the next 20 events starting today.
	The returned events are sorted by date.
	If you want all events after the date, make amount very large
*/
exports.getFutureEvents = function(fdate, amount, callback) {
	mongo.connect(mongo_url,{ useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		console.log("Connected to database\t getting events");
		var dbo = db.db("REC_database");
		dbo.collection('events').find({date: {$gte: fdate}}).sort({date: 1}).limit(amount).toArray(function(err, result) {
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
// list events from a a specified date and greater


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