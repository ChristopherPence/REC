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
});