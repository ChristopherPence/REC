<<<<<<< HEAD
/*
	Read file from upload and preview it in image tag
	@variables
		#imgsrc is the file input field
		#imgPrev is the img output tag
*/
const reader = new FileReader();
$('#imgsrc').change(function(){
	//make sure file is attached
	if($('#imgsrc').prop("files")){
		//Update the image tag
		reader.onload = function(e){
			$('#imgPrev').attr('src', e.target.result);
		};
		reader.readAsDataURL($('#imgsrc').prop("files")[0]);
	}
=======
/*
	Read file from upload and preview it in image tag
	@variables
		#imgsrc is the file input field
		#imgPrev is the img output tag
*/
const reader = new FileReader();
$('#imgsrc').change(function(){
	//make sure file is attached
	if($('#imgsrc').prop("files")){
		//Update the image tag
		reader.onload = function(e){
			$('#imgPrev').attr('src', e.target.result);
		};
		reader.readAsDataURL($('#imgsrc').prop("files")[0]);
	}
>>>>>>> b0012ce7fc3d92f8edc3559f6ce8f5a3601aebae
});