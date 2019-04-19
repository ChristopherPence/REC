/*
	This node module allows for easy upload and deletion of photos
	on cloudinary. It requires the cloudinary module and is a wrapper class 
	for all of the functions we need in the real cloudinary module.
*/

//load in the API keys and configure the cloud connection
const cloud = require('cloudinary').v2;
require('dotenv').config();
cloud.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET
});

/*
	Upload an image to the cloud and return back the correct information
	for storage in a database. 

	image = file on the server, image format (jpg, png)
	callback (success, url, public_id)
		success = true if uploaded, false if failure
		url = url to the image if it was uploaded
		public_id = the public_id of the image to be stored in the database
			this is needed to delete the image
*/
exports.upload = function(image, callback){
	cloud.uploader.upload(image, function(error, result) {
		console.log(error);
		if(error) callback(false, null, null);
		else callback(true, result.url, result.public_id);
	});
}

/*
	Delete an image from the cloud and return true or false upon success

	public_id = public id of the image stored in the database upon upload
	callback (success)
		success = true if deleted, false if failure
*/
exports.delete = function(public_id, callback){
	cloud.api.delete_resources(public_id, function(error, result){
		if(!error) callback(true);
		else callback(false);
	});
}