var app = angular.module('myApp', ['ngCookies']);
app.controller('profileCtrl', function($scope, $http) {
  
  $scope.stepsModel = [];
  $scope.profileModel = [];
  
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

  $scope.imageUpload = function(image){
    var reader = new FileReader();
    reader.onload = $scope.loadedImage;
    reader.readAsDataURL(image.files[0]);
  }

  $scope.loadedImage = function(theImage){
      $scope.$apply(function() {
          $scope.stepsModel.push(theImage.target.result);
      });
  }
  
  $scope.imageUploadProfile = function(image){
    var reader = new FileReader();
    reader.onload = $scope.loadedImageProfile;
    reader.readAsDataURL(image.files[0]);
  }

  $scope.loadedImageProfile = function(theImage){
      $scope.$apply(function() {
          $scope.profileModel.push(theImage.target.result);
      });
  }
  
});