var total = 0;
var todayz = new Date();
var yearz = todayz.getFullYear();
var monthz = todayz.getMonth();
var dayzNext = new Date(yearz, monthz+1, 0).getDate();
var curDate = new Date();
var curYearz = todayz.getFullYear();
var curMonthz = todayz.getMonth();
var curDayz = todayz.getDate();
var firstDay;
var nextMonthDayz;
var totalDay;
var fullWeek = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
var smallWeek = ['Sun.','Mon.','Tue.','Wed.','Thr.','Fri.','Sat.'];
var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

window.onresize = cellzChange;
window.onload = makeCalendar();

function cellzChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  var fontSize = $(".cellz").css('font-size');
  var divHeight;
//  console.log(widthz);
//  console.log(heightz);
  $(".calendar").css("width", widthz*0.8);
  if(heightz < 500)
  {
    $(".cellz").css("height", 45);
//    divHeight = 45;
  }
  else
  {
    divHeight = $(".datez").css('height');
    divHeight = parseInt(divHeight.substring(0,divHeight.length-2))*2.3;
    $(".cellz").css('height',divHeight);
  }
  //$("#calendarHeader").css("font-size", divHeight*0.5);
}

function moveCalUp() {
  console.log("HELLO");
  console.log(firstDay);
  console.log(firstDay.getDay());
  if(firstDay.getDay() == 0)
  {
    //when whole new month above
    curDate = new Date(curYearz, curMonthz-1, 1);
    curDayz = curDate.getDate();
    curMonthz = curDate.getMonth();
    curYearz = curDate.getFullYear();
    makeCalendar();
  }
  else
  {
    curDate = new Date(curYearz, curMonthz-1, 1);
    curDayz = curDate.getDate();
    curMonthz = curDate.getMonth();
    curYearz = curDate.getFullYear();
    makeCalendar();
  }
}

function moveCalDown() {
  console.log("HELLO");
  console.log(firstDay);
  console.log(firstDay.getDay());
  if(firstDay.getDay() == 0)
  {
    //when whole new month above
    curDate = new Date(curYearz, curMonthz+1, 1);
    curDayz = curDate.getDate();
    curMonthz = curDate.getMonth();
    curYearz = curDate.getFullYear();
    makeCalendar();
  }
  else
  {
    curDate = new Date(curYearz, curMonthz+1, 1);
    curDayz = curDate.getDate();
    curMonthz = curDate.getMonth();
    curYearz = curDate.getFullYear();
    makeCalendar();
  }
}

function makeCalendar()
{
  firstDay = new Date(curYearz, curMonthz, 1);
  nextMonthDayz = 7-((firstDay.getDay() + dayzNext))%7;
  totalDay = firstDay.getDay() + dayzNext + nextMonthDayz;
//  console.log(firstDay.getDay());
//  console.log(dayzNext);
//  console.log(nextMonthDayz);
//  console.log(curDayz);
//    console.log(firstDay);
//    console.log(7-((firstDay.getDay() + dayz))%7);
  var stringCal = "";
  total = 0;
  stringCal += '<tr class = "border"><th colspan="1" class = "cellz" id = "calendarHeader"></th> <th colspan="1" class = "cellz" id = "calendarHeader"><a href = "#" onclick = "moveCalUp()"><<<</a></th><th colspan="3" class = "cellz" id = "calendarHeader">' + months[curMonthz] + ' ' + curYearz +  '</th><th colspan="1" class = "cellz" id = "calendarHeader"><a href = "#" onclick = "moveCalDown()">>>></a></th> <th colspan="1" class = "cellz" id = "calendarHeader"></th></tr>';
  stringCal += '<tr>';
  for(var k = 0; k<7; k++)
  {
    stringCal += '<th class="cellz weekDayz  border text-muted"><div class = "ml-1 mr-1">' + smallWeek[k] + '</div></th>'
  }
  stringCal += '</tr>';
  var tempDay = new Date(curYearz, curMonthz, 1);
  //console.log(tempDay);
  tempDay = new Date(tempDay.setDate(tempDay.getDate()-firstDay.getDay()));
  //console.log(tempDay);
  //console.log(tempDay.getFullYear());
  for(var i = 0;i<totalDay/7;i++)
  {
   stringCal += '<tr>';
    for(var j = 0;j<7;j++)
    {
      if(total < firstDay.getDay() || total >= firstDay.getDay() + dayzNext)
      {
         stringCal += ('<td class="cellz  border text-primary"><div class = "datez d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
//          stringCal += ('<td class="cellz  border text-muted"><div class = "datez d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + pad(tempDay.getMonth() + 1) + '</div>/<div>' + pad(tempDay.getDate()) + '</div>/<div>' + (tempDay.getFullYear()) + '</div></div></td>');
      }
      else
      { 
          if((monthz == curMonthz)&&(curYearz == yearz)&&(firstDay.getDay() + todayz.getDate() - 1 == total))
          {
            stringCal += ('<td class="cellz  bordertext-white bg-primary"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
//            stringCal += ('<td class="cellz  bordertext-white bg-primary"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + pad(tempDay.getMonth() + 1) + '</div>/<div>' + pad(tempDay.getDate()) + '</div>/<div>' + (tempDay.getFullYear()) + '</div></div></td>');
          }
          else
          {
            stringCal += ('<td class="cellz  border text-danger"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
//            stringCal += ('<td class="cellz  border text-primary"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + pad(tempDay.getMonth() + 1) + '</div>/<div>' + pad(tempDay.getDate()) + '</div>/<div>' + (tempDay.getFullYear()) + '</div></div></td>');
          }
      }
      tempDay = new Date(tempDay.setDate(tempDay.getDate()+1));
      total++;
    }
    stringCal += '</tr>';
  }
  $('#calendarz').html(stringCal);
  cellzChange();

    //make sure the date is not before 1900
}


var app = angular.module('myApp', []);
  app.controller('customersCtrl', function($scope, $http) {
    $scope.cal = "calendarz";
    
  });

    

function pad(num) 
{
  var s = "00" + num;
  return s.substr(("" + num).length); 
}