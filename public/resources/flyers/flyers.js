window.onresize = imageChange;

function imageChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  if(heightz > widthz * 0.8)
  {
    heightz = widthz;
    widthz = (widthz/11)*8.5;
  }
  else if(heightz < widthz && heightz <= 400)
  {
    widthz = 366;
    heightz = 487;
  }
    else if(heightz < widthz)
  {
    widthz = heightz;
    heightz = (heightz/8.5)*11;
  }
  $(".flyerz").css("height", heightz*0.7);
  $(".flyerz").css("width", widthz*0.7);
}


var app = angular.module('myApp', []);
  app.controller('customersCtrl', function($scope, $http) {
    $http({
          method : "get",
          url : 'resources/flyers/flyers.json'
          }).then(function mySuccess(response) 
          {
            $scope.flyers = response.data;
          }, function myError(response) 
          {
            console.log(response);
          });    
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) 
    {
	     
      imageChange();
    });
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