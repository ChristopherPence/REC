var app = angular.module('myApp', ['ngCookies']);
app.controller('profileCtrl', function($scope, $http) {
    $scope.init = function(){
        $http({
            method : "get",
            url : '/getOrgEvents'
        }).then(function mySuccess(response){
            $.each(response.data, function(i,item){
                $('#flyerevent').append('<option value=\"' + item.event_id + '\">'+item.title+'</option>');
            });
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