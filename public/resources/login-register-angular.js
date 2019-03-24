var app = angular.module("login", []);
    app.controller("mainController", function($scope, $http){
      
      $scope.login = function() {
        
        $http({
          url: "http://localhost:8080/login",
          method: "POST",
          data: {
            email: $scope.loginEmail,
            password: $scope.loginPassword
          }
        }).then
          (function success(response){
            console.log(response);
            if(response.data == "Found"){
              alert("Logging In!");
              window.location.href = '/';
            } 
            else {
              alert("Account not registered!");
            }
          },
          function error(response){
            alert("Error while logging in!");
        });
      }
      
      $scope.register = function() {
        
        $("#registerModal").modal("hide");
        
        $http({
          method: "POST",
          url: "http://localhost:8080/register",
          data: {
            organization: $scope.organization,
            email: $scope.registerEmail,
            password: $scope.registerPassword,
            blurb: $scope.blurb,
          }
        }).then
          (function success(response){
            if(response.data == "Registered"){
              alert("Successfully registered! Please log in now!");
            }
          },
          function error(response){
            alert("Error while registering!");
        });
      }
    });