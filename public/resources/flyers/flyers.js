//this page shows the flyers for the users in chronological order, and takes down the nessary flyers
//_____________________________________________________________________________________________________________________________
//GLOBAL VARIABLES
var numFlyers;  //the number of flyers obtained and to be displayed
var num;        //the width of the section containing one flyer
var fixer;      //a pixel fix due to rotation for side scroll

//_____________________________________________________________________________________________________________________________
//this ensures that when the page is resized that the flyers are dynamically changed
window.onresize = function(){imageChange(); fixer = 0};

//_____________________________________________________________________________________________________________________________
//this function dynamically changes the sizing of the flyers and the sidescrolling length depending on the window height
function imageChange() 
{
  var widthz =  parseInt($('html').width());
  var heightz = parseInt($('html').css('height'));;
  var widthImg = heightz * 0.70;
  
  if(widthz > heightz)
  {
    widthImg = heightz * 0.70;
  }
  else
  {
    widthImg = widthz * 0.70;
  }
  
  $(".flyerz").css("height", widthImg);
  $(".sideScroll").css("height", widthImg);
  $(".sideScroll").css("width", widthImg);
  
  
  $('.horizontal-scroll-wrapper').css('height',(widthz));
  $('.horizontal-scroll-wrapper').css('width',widthImg+30);
  $(".squares:first-child").css("padding-top", (widthz*.5  - widthImg * 1.1));
  if(widthz > heightz)
  {
    $(".horizontal-scroll-wrapper").css("transform", "rotate(-90deg) translateY(-" + (widthImg+30)  + "px)");
  }
  else
  {
    $(".horizontal-scroll-wrapper").css("transform", "rotate(-90deg) translateY(-" + (widthImg+30)  + "px)");
  }
  $('.sideScroll').css('margin-top',widthImg*0.6);
  $('.sideScroll').css('margin-bottom',widthImg*0.6);
  $('.flyerz').css('transform','rotate(90deg)');
  
  $('.sideScroll').css('transform-origin','right top');
    
   numFlyers = $('.sideScroll').length;
   widthFlyers = $('.flyers').css("width");
   num = widthImg*2.2;
   var width = (numFlyers-1) * (num); 
  $('.help').css('height',(width));
  $(".help").css("margin-bottom", (widthz*.5  - widthImg*1.1));
  $('.flyerz').css('margin-left',4);
}

//_____________________________________________________________________________________________________________________________
//this function allows the user to swipe left and right on the mousepad to scroll left and right respectively
function side(e,event) {
  if(Math.abs(event.deltaX) > Math.abs(event.deltaY))
  {
   event.preventDefault();
    e.scrollBy(0,event.deltaX);
  }
  else
  {
    e.scrollBy(0,event.deltaY);
  }
}

//_____________________________________________________________________________________________________________________________
//this angular obtains the flyers necessary to display for the user
var app = angular.module('myApp', ['ngCookies']);
app.controller('customersCtrl', function($scope, $http) {
  $http({
        method : "get",
        url : '/getflyers'
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

//this function removes spaces in angular {} 
app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
      return string.replace(/[\s]/g, '');
    };
}]);

//this function runs the javascript styling of the angular obtained flyers after they are obtained and rendered
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