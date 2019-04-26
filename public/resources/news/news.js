//this page gets the news for the current day and chronologically after. These are the next 20 events.
//_____________________________________________________________________________________________________________________________
//GLOBAL VARIABLES
var pageNumber = 1;   //variables for request
var size = 80;        //
var query = "";       //

//_____________________________________________________________________________________________________________________________
//change the events so that they fit for width sizing
window.onresize = imageChange;

//_____________________________________________________________________________________________________________________________
//this function changes the class of the modal information of events so that the title 
//and dates look good
function imageChange() 
{
  var heightz = window.innerHeight; //the height of the window in pixels
  var widthz = window.innerWidth;   //the width of the window in pixels
  
  //if the width of the page becomes less than a certain size, make the information display
  //like a column
  if(widthz < 850)
  {
    $('.headingz').addClass('flex-column');
  }
  //otherwise keep the title and the date on the same line
  else
  {
    $('.headingz').removeClass('flex-column');
  }
  
  //ensure images (future implementation) are sized correctly
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

//_____________________________________________________________________________________________________________________________
//this is the angular module that obtains the data to show the most recent events
var app = angular.module('myApp', ['ngCookies', 'ngSanitize']);
app.controller('customersCtrl', function($scope, $http) {
    $scope.run = function(){
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
        for (var i = 0; i < response.data.length; i++) {
          if(response.data[i].title.length > 35)
          {
            response.data[i].title = (response.data[i].title).substring(0,35) + "...";
          }
          var endDateString = "";
          var tempDateStart = (new Date(response.data[i].timeStart));
          var tempDateEnd = (new Date(response.data[i].timeEnd));
          if(tempDateStart.getHours() >= 12)
          {
            if(tempDateStart.getHours() == 12)
            {
              var start = (tempDateStart.getMonth()+1) + "/" + tempDateStart.getDate() + "/" + (tempDateStart.getYear()).toString().substring(1,3) + " " + ((tempDateStart.getHours()))+":"+pad(tempDateStart.getMinutes()) + "PM";
            }
            else
            {
              var start = (tempDateStart.getMonth()+1) + "/" + tempDateStart.getDate() + "/" + (tempDateStart.getYear()).toString().substring(1,3) + " " + ((tempDateStart.getHours())%12)+":"+pad(tempDateStart.getMinutes()) + "PM";
            }
          }
          else
          {
            var start = (tempDateStart.getMonth()+1) + "/" + tempDateStart.getDate() + "/" + (tempDateStart.getYear()).toString().substring(1,3) + " " + ((tempDateStart.getHours()+11)%12 +1)+":"+pad(tempDateStart.getMinutes()) + "AM";
          }
          if(tempDateEnd.getMonth() != tempDateStart.getMonth() || tempDateEnd.getDay() != tempDateStart.getDay() || tempDateEnd.getYear() != tempDateStart.getYear())
          {
            endDateString = (tempDateEnd.getMonth()+1) + "/" + tempDateEnd.getDate() + "/" + (tempDateEnd.getYear()).toString().substring(1,3) + " ";
          }
          if(tempDateStart.getHours() >= 12)
          {
            if(tempDateStart.getHours() == 12)
            {
             var end = endDateString + ((tempDateEnd.getHours()))+":"+pad(tempDateEnd.getMinutes()) + "PM";
            }
            else
            {
              var end = endDateString + ((tempDateEnd.getHours())%12)+":"+pad(tempDateEnd.getMinutes()) + "PM";
            }
          }
          else
          {
            var end = endDateString + ((tempDateEnd.getHours()+11)%12 +1)+":"+pad(tempDateEnd.getMinutes()) + "AM";
          }
          response.data[i].timeStart = start;
          response.data[i].timeEnd = end;
        }
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

//this filter removes spaces for an angular in {}
app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
      return string.replace(/[\s]/g, '');
    };
}]);
  
//this function ensures that when the angular code runs and is finished being rendered, the events css styling
//performed by the javascript runs
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

//_____________________________________________________________________________________________________________________________
//this function pads any number with 0's so that it is always 2 digits of string
function pad(num) 
{
  var s = "00" + num;
  return s.substr(("" + num).length); 
}