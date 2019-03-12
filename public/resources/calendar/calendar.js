var dayz = 0;
var monthz = 0;
var yearz = 0;
var curDayz = 0;
var curMonthz = 0;
var curYearz = 0;
var total = 0;
var bigEnough = 1;
var fullWeek = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
var smallWeek = ['Sun.','Mon.','Tue.','Wed.','Thr.','Fri.','Sat.'];

//CHECK WHAT VARIABLES USE var
window.onresize = cellzChange;
window.onload = cellzChange;

function cellzChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  if(widthz < 710)
  {
    if(bigEnough == 1)
    {
      bigEnough = 0;
      makeCalendar();
    }
    bigEnough = 0;
  }
  else
  {
    if(bigEnough == 0)
    {
      bigEnough = 1;
      makeCalendar();
    }
    bigEnough = 1;
  }
  
  
//  if(heightz > widthz * 0.8)
//  {
//    heightz = widthz;
//    widthz = (widthz/11)*8.5;
//  }
//  else if(heightz < widthz && heightz <= 400)
//  {
//    widthz = 366;
//    heightz = 487;
//  }
//    else if(heightz < widthz)
//  {
//    widthz = heightz;
//    heightz = (heightz/8.5)*11;
//  }
  $(".cellz").css("height", heightz*0.1);
  $(".cellz").css("width", widthz*0.1);
}

function makeCalendar()
{
  todayz = new Date();
  yearz = todayz.getFullYear();
  monthz = todayz.getMonth();
  dayz = new Date(yearz, monthz+1, 0).getDate();
  curYearz = todayz.getFullYear();
  curMonthz = todayz.getMonth();
  curDayz = todayz.getDate();

  firstDay = new Date(yearz, monthz, 1);
  beforeDayz = 7-((firstDay.getDay() + dayz))%7;
  totalDay = firstDay.getDay() + dayz + beforeDayz;
//    console.log(firstDay);
//    console.log(7-((firstDay.getDay() + dayz))%7);
  var stringCal = "";
  total = 0;
  stringCal += '<div class="row bg-white no-gutters">';
  if(bigEnough)
  {
    for(var k = 0; k<7; k++)
    {
      stringCal += '<div class="cellz weekDayz col border d-flex justify-content-center align-items-center text-muted">' + fullWeek[k] + '</div>'
    }
  }
  else
  {
    for(var k = 0; k<7; k++)
    {
      stringCal += '<div class="cellz weekDayz col border d-flex justify-content-center align-items-center text-muted">' + smallWeek[k] + '</div>'
    }
  }
  var tempDay = new Date(yearz, monthz, 1);
  console.log(tempDay);
  tempDay = new Date(tempDay.setDate(tempDay.getDate()-beforeDayz+1));
  console.log(tempDay);
  console.log(tempDay.getFullYear());
  for(var i = 0;i<totalDay/7;i++)
  {
   stringCal += '<div class="w-100"></div>';
    for(var j = 0;j<7;j++)
    {
      if(total < firstDay.getDay() || total >= firstDay.getDay() + dayz)
      {
         stringCal += ('<div class="cellz col border d-flex justify-content-center align-items-center text-muted">' + (tempDay.getMonth() + 1) + '/' + (tempDay.getDate()) + '/' + (tempDay.getFullYear()) + '</div>');
      }
      else
      {  
          if((curDayz == todayz)&&(monthz == curMonthz)&&(curYearz == yearz)&&(beforeDayz + curDayz == total))
          {
            stringCal += ('<div class="cellz col border d-flex justify-content-center align-items-center text-white bg-primary">' + (tempDay.getMonth() + 1) + '/' + (tempDay.getDate()) + '/' + (tempDay.getFullYear()) + '</div>');
          }
          else
          {
            stringCal += ('<div class="cellz col border d-flex justify-content-center align-items-center text-primary">' + (tempDay.getMonth() + 1) + '/' + (tempDay.getDate()) + '/' + (tempDay.getFullYear()) + '</div>');
          }
      }
      tempDay = new Date(tempDay.setDate(tempDay.getDate()+1));
      total++;
    }
  }
  stringCal += '</div>';
  $('#calendarz').html(stringCal);


    //make sure the date is not before 1900
}


var app = angular.module('myApp', []);
  app.controller('customersCtrl', function($scope, $http) {
    $scope.cal = "calendarz";
    makeCalendar();
  });
