var numFlyers;
var num;
var fixer;
window.onresize = function(){imageChange(); fixer = 0};

function imageChange() 
{
  var widthz =  parseInt($('html').width());
  //var widthz = window.innerWidth;
  var heightz = parseInt($('html').css('height'));;
  var widthImg = heightz * 0.70;
  
  if(widthImg > widthz*.99)
  {
    widthImg = widthz * 0.99;
  }
  
  $(".flyerz").css("height", widthImg);
  $(".sideScroll").css("height", widthImg);
  $(".sideScroll").css("width", widthImg);
  
  $('.horizontal-scroll-wrapper').css('height',(widthz + fixer));
  $('.horizontal-scroll-wrapper').css('width',widthImg+30);
  $(".squares:first-child").css("padding-top", (widthz*.5  + widthImg*.5));
  
  $(".horizontal-scroll-wrapper").css("transform", "rotate(-90deg) translateY(-" + (widthImg+30)  + "px)");

  $('.sideScroll').css('transform','rotate(90deg)');
  $('.sideScroll').css('transform-origin','right top');
    
   numFlyers = $('.sideScroll').length;
   num = widthImg;
   var width = (numFlyers-1) * (num); 
  $('.help').css('height',(width));
  $(".help").css("margin-bottom", (widthz*.5  - widthImg*.5));
  $('.flyerz').css('margin-top',10);
}

function side(e,event) {
  if(event.deltaX > event.deltaY)
  {
    e.scrollBy(0,event.deltaX);
  }
  else
  {
    e.scrollBy(0,event.deltaY);
  }
}

function side(e,event) {
  if(event.deltaX > event.deltaY)
  {
    e.scrollBy(0,event.deltaX);
  }
  else
  {
    e.scrollBy(0,event.deltaY);
  }
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
      fixer = 14;
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