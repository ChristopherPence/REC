// Variables for request
var pageNumber = 1;
var size = 80;
var query = "";

window.onresize = imageChange;

function imageChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  
  if(widthz < 850)
  {
    $('.headingz').addClass('flex-column');
  }
  else
  {
    $('.headingz').removeClass('flex-column');
  }
  
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
  $(".clubIm").css("height", heightz*0.1);
  $(".clubIm").css("width", widthz*0.1);
}

var app = angular.module('myApp', []);
  app.controller('customersCtrl', function($scope, $http) {
      $scope.run = function(){
          console.log("Detected properly");
          $http({
              method : "get",
              url : '/getnews/?page='+pageNumber+'&size='+size+'&search='+query,
              data: {
                  page: pageNumber,
                  size: size,
                  search: query
              }
          }).then(function mySuccess(response)
          {
              $scope.news = response.data;
          }, function myError(response)
          {
              console.log(response);
          });

          $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent)
          {
              imageChange();
          });
      }
  });
   
app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
      return string.replace(/[\s]/g, '');
    };
}]);
  
app.directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
});

    
    
   