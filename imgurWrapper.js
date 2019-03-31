/*
	This node module allows for easy upload and deletion of photos
	on imgur. It requires the imgur module and is a wrapper class 
	for all of the functions we need in the real imgur module.
*/
const imgur = require('imgur');

//save the client id to the imgur module
imgur.setClientId(process.env.CLIENT_ID);
imgur.setAPIUrl('https://api.imgur.com/3/');

/*
	Upload an image to imgur and passback true/false, the link and the delhash
	@callback (success, link, delhash)
		success = true if uploaded, false if failure
		link = link to the image
		delhash = delhash to be saved in database
*/
exports.upload = function(image, callback){
	imgur.uploadFile(image).then(function(res){
		console.log('Delete Hash: '+res.data.deletehash);
		console.log('Link: '+res.data.link);
		callback(true, res.data.link, res.data.deletehash);
	}).catch(function(err){
		console.log(err.message);
		callback(false, null, null);
	});
}
	
/*
	Delete an image from imgur and passback true or false
	@callback (success)
		success = true if deleted, false if it failed to delete
*/
exports.delete = function(delhash, callback){
	imgur.deleteImage(delhash).then(function(status){
		console.log(status);
		callback(true);
	}).catch(function(err){
		console.log(err.message);
		callback(false);
	});
}