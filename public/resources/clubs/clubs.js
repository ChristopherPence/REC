var pageNumber = 1;
var query = "";

var app = angular.module('clubs', []);
app.controller('clubsCtrl', function($scope, $http) {
    $scope.run = function(){
        console.log("Detected properly");
        $http({
            method : "get",
            url : '/getclubs',
            data: {
                page: pageNumber,
                search: query
            }
        }).then(function mySuccess(response){
            console.log(response);
        });
    }


});