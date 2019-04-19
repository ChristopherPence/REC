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
      url: "/login",
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
    if($scope.organization == "" || $scope.registerEmail == "" || $scope.blurb == "" || $scope.registerPassword == "" || $scope.confirmPassword == "" || $scope.organization == undefined || $scope.registerEmail == undefined || $scope.blurb == undefined || $scope.registerPassword == undefined || $scope.confirmPassword == undefined){
      console.log($scope.organization);
      console.log($scope.email);
      console.log($scope.blurb);
      console.log($scope.registerPassword);
      console.log($scope.confirmPassword);
      $scope.registerError = "Please fill in missing fields!";
      return false;
    }
        
    // Check if password and confirm password fields do match
    if($scope.registerPassword != $scope.confirmPassword){
      $scope.registerError = "Passwords do not match!";
      return false;
    }
    
    // Check if there are any problems in inputting information for registration
    if(checkPasswordRequirements() == false) {
      $scope.registerError = "Please make sure your information meets all requirements!";
      return false;
    }

    // Hiding the modal after creating the account to allow the user to log in
    $("#registerModal").modal("hide");

    // HTTP Post request to store user account in database
    $http({
      method: "POST",
      url: "/register",
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
        else {
          alert("Email is already taken! Please try a different email!.")
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

//// Function to dynmaically display whether or not an email is valid
//function checkEmail() {
//  var emailReq = true;
//  console.log("HELLO");
//  var getEmail = document.getElementById("registerEmail").value;
//  if(getEmail != ""){
//    $.ajax({
//      type: "GET",
//      url: "http://apilayer.net/api/check?access_key=2d7335eb56d000137084447e6443bb0e&email=" + getEmail + "&smtp=1&format=1",
//      dataType: "JSONP",
//      success: function(response) {
//        console.log(response)
//        if(response.format_valid != true) {
//          document.getElementById("goodEmail").style.color = 'red';
//          document.getElementById("goodEmail").innerHTML = "Email is not in correct format!";
//          emailReq = false;
//        }
//
//        else if(response.domain != "rpi.edu") {
//          document.getElementById("goodEmail").style.color = 'red';
//          document.getElementById("goodEmail").innerHTML = "Email is not from the rpi.edu domain!";
//          emailReq = false;
//        }
//        else if(response.smtp_check != true) {
//          document.getElementById("goodEmail").style.color = 'red';
//          document.getElementById("goodEmail").innerHTML = "Email is not valid!";
//          emailReq = false;
//        }
//        else {
//          document.getElementById("goodEmail").style.color = 'green';
//          document.getElementById("goodEmail").innerHTML = "Valid Email!";
//        }
//      },
//      error: function(error) {
//        alert("There was a problem with: " + error);
//        emailReq = false;
//      }
//    });
//  }
//  else {
//    document.getElementById("goodEmail").innerHTML = "";
//    emailReq = false;
//  }
//  
//  return emailReq;
//}

// Summation of all password checks that need to be done
function checkPasswordRequirements() {
  var lengthReq;
  var specialReq;
  var upperReq;
  var lowerReq;
  var digitReq;
  var matchReq;
  
  if(document.getElementById("registerPassword").value != ""){
    lengthReq = checkPasswordLength();
    specialReq = checkPasswordSpecialChar();
    upperReq = checkPasswordUppercase();
    lowerReq = checkPasswordLowercase();
    digitReq = checkPasswordDigits();
    matchReq = checkPasswordMatch();
  }
  else {
    document.getElementById("lengthRequirement").innerHTML = "";
    document.getElementById("specialCharRequirement").innerHTML = "";
    document.getElementById("upperCaseRequirement").innerHTML = "";
    document.getElementById("lowerCaseRequirement").innerHTML = "";
    document.getElementById("digitRequirement").innerHTML = "";
    document.getElementById('matchingPassword').innerHTML = "";
    return false;
  }
  
  return (lengthReq && specialReq && upperReq && lowerReq && digitReq && matchReq);
}

// Function to dynamically display whether or not password and confirm password fields are matching
function checkPasswordMatch() {
  if(document.getElementById('registerPassword').value == document.getElementById('confirmPassword').value && document.getElementById('registerPassword').value != "" && document.getElementById('confirmPassword').value != ""){
    document.getElementById('matchingPassword').style.color = 'green';
    document.getElementById('matchingPassword').innerHTML = "Passwords are matching!";
    return true;
  }
  else if(document.getElementById('registerPassword').value == "" && document.getElementById('confirmPassword').value == ""){
    document.getElementById('matchingPassword').innerHTML = "";
    return false;
  }
  else {
    document.getElementById('matchingPassword').style.color = 'red';
    document.getElementById('matchingPassword').innerHTML = "Passwords are NOT matching!";
    return false;
  }
}

// Function that checks that password of registration has a minimum length of 8
function checkPasswordLength() {
  if(document.getElementById("registerPassword").value.length >= 8){
    document.getElementById("lengthRequirement").style.color = "green";
    document.getElementById("lengthRequirement").innerHTML = "(1) Password meets minimum length of 8 characters!";
    return true;
  }
  else {
    document.getElementById("lengthRequirement").style.color = "red";
    document.getElementById("lengthRequirement").innerHTML = "(1) Password does NOT meet minimum length of 8 characters!";
    return false;
  }
}

// Function that checks that password of registration has a special character
function checkPasswordSpecialChar() {
  if(/[!@#$%^&*]/.test(document.getElementById("registerPassword").value)){
    document.getElementById("specialCharRequirement").style.color = "green";
    document.getElementById("specialCharRequirement").innerHTML = "(2) Password must contain special character!";
    return true;
  }
  else {
    document.getElementById("specialCharRequirement").style.color = "red";
    document.getElementById("specialCharRequirement").innerHTML = "(2) Password must contain special character!";
    return false;
  }
}

// Function that checks that password of registration has an upper case letter
function checkPasswordUppercase() {
  if(/[A-Z]/.test(document.getElementById("registerPassword").value)){
    document.getElementById("upperCaseRequirement").style.color = "green";
    document.getElementById("upperCaseRequirement").innerHTML = "(3) Password must contain upper letter!";
    return true;
  }
  else {
    document.getElementById("upperCaseRequirement").style.color = "red";
    document.getElementById("upperCaseRequirement").innerHTML = "(3) Password must contain uppercase letter!";
    return false;
  }
}

// Function that checks that password of registration has a lower case letter
function checkPasswordLowercase() {
  var lowercaseRegex = new RegExp("(?=.*?[a-z])");
  if(/[a-z]/.test(document.getElementById("registerPassword").value)){
    document.getElementById("lowerCaseRequirement").style.color = "green";
    document.getElementById("lowerCaseRequirement").innerHTML = "(4) Password must contain lowercase letter!";
    return true;
  }
  else {
    document.getElementById("lowerCaseRequirement").style.color = "red";
    document.getElementById("lowerCaseRequirement").innerHTML = "(4) Password must contain lowercase letter!";
    return false;
  }
}

// Function that checks that password of registration has a digit
function checkPasswordDigits() {
  var digitRegex = new RegExp("(?=.*?[0-9])");
  if(/[0-9]/.test(document.getElementById("registerPassword").value)){
    document.getElementById("digitRequirement").style.color = "green";
    document.getElementById("digitRequirement").innerHTML = "(5) Password must contain digit!";
    return true;
  }
  else {
    document.getElementById("digitRequirement").style.color = "red";
    document.getElementById("digitRequirement").innerHTML = "(5) Password must contain digit!";
    return false;
  }
}

// Function to display password and confirm password as characters than periods and vice versa
function allowShowPassword() {
  // Clicking on the eye in the password input
  $(document).ready( function() {
    $(".regpass.fas.fa-eye").on("click", function() {
      $(this).toggleClass("fa-eye-slash");
      var type = $("#registerPassword").attr("type");
      if(type == "text"){
        $("#registerPassword").prop("type", "password");
      }
      else {
        $("#registerPassword").prop("type", "text");
      }
    });
  });
  
  // Clicking the eye in the confirm password input
  $(document).ready( function() {
    $(".confpass.fas.fa-eye").on("click", function() {
      $(this).toggleClass("fa-eye-slash");
      var type = $("#confirmPassword").attr("type");
      if(type == "text"){
        $("#confirmPassword").prop("type", "password");
      }
      else {
        $("#confirmPassword").prop("type", "text");
      }
    });
  });
}