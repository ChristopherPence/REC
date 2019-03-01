window.onresize = imageChange;

function imageChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  if(heightz > widthz)
  {
    heightz = widthz;
  }
  else if(heightz < widthz)
  {
    widthz = heightz;
  }
  if(heightz < 400)
  {
    heightz = 400;
    widthz = 400;
  }
  console.log(widthz);
  console.log(heightz);
  console.log($(".clubIm"));
  $(".clubIm").css("height", heightz*0.1);
  $(".clubIm").css("width", widthz*0.1);
  
  
  var secz = $('.newsEvent');
  console.log(secz);
  
}

var app = angular.module('myApp', []);
  app.controller('customersCtrl', function($scope, $http) {
    $http({
          method : "get",
          url : 'resources/news/news.json'
          }).then(function mySuccess(response) 
          {
            $scope.news = response.data;
          }, function myError(response) 
          {
            console.log(response);
          });    
    
    if ($scope.$last){
      console.log("im the last!");
    }
  });
   
app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
      console.log(string);
      return string.replace(/[\s]/g, '');
    };
}]);
    


    
    
   