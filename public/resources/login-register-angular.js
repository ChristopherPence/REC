var app = angular.module("login", []);
app.controller("mainController", function($scope, $http){
  
  // Array for the uploaded 
  $scope.stepsModel = [];

  // Checks email and password of account for logging in
  $scope.login = function() {
    
    // Check email and password fields are filled for login and displays error message
    if($scope.loginPassword == "" || $scope.loginEmail == "" || $scope.loginPassword == undefined || $scope.loginEmail == undefined) {
      $scope.loginError = "Please enter missing email or password!";
      return false;
    }
    
    // HTTP post request to the database
    $http({
      method: "POST",
      url: "./login",
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

  // Register user account into database
  $scope.register = function() {
    
    // Check if any fields are empty and displays error message
    if($scope.organization == "" || $scope.email == "" || $scope.blurb == "" || $scope.registerPassword == "" || $scope.confirmPassword == "" || $scope.organization == undefined || $scope.email == undefined || $scope.blurb == undefined || $scope.registerPassword == undefined || $scope.confirmPassword == undefined){
      $scope.registerError = "Please fill in missing fields!";
      return false;
    }
        
    // Check if password and confirm password fields do match
    if($scope.registerPassword != $scope.confirmPassword){
      $scope.registerError = "Passwords do not match!";
      return false;
    }

    // Hiding the modal after creating the account to allow the user to log in
    $("#registerModal").modal("hide");

    // HTTP Post request to store user account in database
    $http({
      method: "POST",
      url: "./register",
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
});

// Function to dynamically display whether or not password and confirm password fields are matching
function checkPassword() {
  if(document.getElementById('registerPassword').value == document.getElementById('confirmPassword').value && document.getElementById('registerPassword').value != "" && document.getElementById('confirmPassword').value != ""){
    document.getElementById('matchingPassword').style.color = 'green';
    document.getElementById('matchingPassword').innerHTML = "Passwords are matching!";
  }
  else if(document.getElementById('registerPassword').value == "" && document.getElementById('confirmPassword').value == ""){
    document.getElementById('matchingPassword').style.color = 'gold';
    document.getElementById('matchingPassword').innerHTML = "Missing Password field(s)!";
  }
  else {
    document.getElementById('matchingPassword').style.color = 'red';
    document.getElementById('matchingPassword').innerHTML = "Passwords are NOT matching!";
  }
}