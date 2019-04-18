var app = angular.module('myApp', ['ngCookies']);
app.controller('profileCtrl', function($scope, $http) {
    $scope.run = function(){
        console.log("Detected properly");
        $http({
            method : "get",
            url : '/getclubs/?page='+pageNumber+'&size='+size+'&search='+query,
        }).then(function mySuccess(response){
            $scope.clubs = response.data;
            console.log($scope.clubs);
        });
    }
});

//preview the image
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