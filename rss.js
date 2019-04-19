/*
	This node module allows us to call the RPI calendar events API and 
	store all of the events in our database. 
*/
const request = require('request');
const mgo = require('./mongoWrapper.js');
const url_2 = 'http://events.rpi.edu:7070/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href!=%22/public/.bedework/categories/Ongoing%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&count=2';
const url_100 = 'http://events.rpi.edu:7070/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href!=%22/public/.bedework/categories/Ongoing%22)%20and%20(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&count=100';

//test function to get one event
exports.msg = function(){
	request(url_1,
		function(error, response, body){
			 console.log(body);
		}
	);
}

/*
	Get the next 100 events from the moment of calling forward 
	and store non-repeats in the database. Database storage is
	controlled through the MongoWrapper class.
*/
exports.getEvents = function(){
	//make the API call
	console.log('Loading RPI events into database');
	request(url_100, function(error, response, body){
		//destructure the body object into the events array
		const {bwEventList : {events = []}} = JSON.parse(body);
		//loop through the events and re-format them into REC_database format
		var result = [];
		for(e in events){
			var tmp = {};
			tmp.event_id = events[e].guid;
			tmp.organizer = 'RPI';
			tmp.title = events[e].summary;
			tmp.timeStart = new Date(events[e].start.datetime.substring(0,4),
							events[e].start.datetime.substring(4,6) - 1, 
							events[e].start.datetime.substring(6,8),
							events[e].start.datetime.substring(9,11),
							events[e].start.datetime.substring(11,12));
			tmp.timeEnd = new Date(events[e].end.datetime.substring(0,4),
							events[e].end.datetime.substring(4,6) - 1, 
							events[e].end.datetime.substring(6,8),
							events[e].end.datetime.substring(9,11),
							events[e].end.datetime.substring(11,12));
			tmp.date = tmp.timeStart;
			tmp.description = events[e].description;
			//insert into the array using spread syntax
			result = [...result, tmp]; 
		}
		//add the events to the database
		//console.log(result);
		mgo.addEventAutomatic(result);
	});
}
