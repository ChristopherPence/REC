var pageNumber = 1;
var size = 20;
var query = "";

var app = angular.module('clubs', ['ngCookies']);
app.controller('clubsCtrl', function($scope, $http) {
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