window.onresize = imageChange;

function imageChange() 
{

  var widthz = window.innerWidth;
  if(widthz > 800)
  {
    widthz = 780;
  }
  $(".flyerz").css("width", widthz*0.9);
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