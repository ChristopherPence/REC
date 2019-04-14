var total = 0;
var todayz = new Date();
var yearz = todayz.getFullYear();
var monthz = todayz.getMonth();
var dayzNext = new Date(yearz, monthz+1, 0).getDate();
var curDate = new Date();
var curYearz = todayz.getFullYear();
var curMonthz = todayz.getMonth();
var curDayz = curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
var firstDay;
var nextMonthDayz;
var totalDay;
var fullWeek = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
var smallWeek = ['Sun.','Mon.','Tue.','Wed.','Thr.','Fri.','Sat.'];
var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var dragged = 0;
window.onresize = cellzChange;
window.onload = makeCalendar();

function changeArrow(elem,eve)
{
//  console.log(elem);
//  console.log(eve.type);
  
  if(elem.id == "leftArrow" && eve.type == "mousedown")
  {
    dragged = 1;
    $('#leftArrow').attr("src","resources/calendar/leftArrow3.png");
  }
  else if(elem.id == "rightArrow" && eve.type == "mousedown")
  {
    dragged = 1;
    $('#rightArrow').attr("src","resources/calendar/rightArrow3.png");
  }
  else if(elem.id == "rightArrow")
  {
    dragged = 0;
    $('#rightArrow').attr("src","resources/calendar/rightArrow1.png");
  }
  else
  {
    dragged = 0;
    $('#leftArrow').attr("src","resources/calendar/leftArrow1.png");
  }
  
  if(elem.id == "leftArrow" && eve.type == "mousedout")
  {
    $('#leftArrow').attr("src","resources/calendar/leftArrow1.png");
  }
  else if(elem.id == "rightArrow" && eve.type == "mousedout")
  {
    $('#rightArrow').attr("src","resources/calendar/rightArrow1.png");
  }
}

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
    $(".arrow").css("height", 30);
//    divHeight = 45;
  }
  else
  {
    divHeight = $(".datez").css('height');
    divHeight = parseInt(divHeight.substring(0,divHeight.length-2))*2.3;
    $(".cellz").css('height',divHeight);
    $(".arrow").css("height", divHeight * 0.6);
  }
  //$("#calendarHeader").css("font-size", divHeight*0.5);
}

function moveCalUp() {
  console.log("HELLO");
  console.log(firstDay);
  console.log(firstDay.getDay());
//  if(firstDay.getDay() == 0)
//  {
    //when whole new month above
    curDate = new Date(curYearz, curMonthz-1, 1);
    curMonthz = curDate.getMonth();
    curYearz = curDate.getFullYear();
    curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
    makeCalendar();
//  }
//  else
//  {
//    curDate = new Date(curYearz, curMonthz-1, 1);
//    curDayz = curDate.getDate();
//    curMonthz = curDate.getMonth();
//    curYearz = curDate.getFullYear();
//    makeCalendar();
//  }
}

function moveCalDown() {
  console.log("HELLO");
  console.log(firstDay);
  console.log(firstDay.getDay());
//  if(firstDay.getDay() == 0)
//  {
    //when whole new month above
    curDate = new Date(curYearz, curMonthz+1, 1);
    curMonthz = curDate.getMonth();
    curYearz = curDate.getFullYear();
    curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
    makeCalendar();
//  }
//  else
//  {
//    curDate = new Date(curYearz, curMonthz+1, 1);
//    curDayz = curDate.getDate();
//    curMonthz = curDate.getMonth();
//    curYearz = curDate.getFullYear();
//    makeCalendar();
//  }
}

function makeCalendar()
{
  firstDay = new Date(curYearz, curMonthz, 1);
  console.log(firstDay.getDay() + curDayz);
  console.log("BRUH " + (7-((firstDay.getDay() + curDayz))%7));
  nextMonthDayz = 7-((firstDay.getDay() + curDayz))%7;
  if(nextMonthDayz == 7)
  {
    nextMonthDayz = 0;
  }
  console.log(nextMonthDayz);
  totalDay = firstDay.getDay() + curDayz + nextMonthDayz;
  console.log(totalDay);
//  console.log(firstDay.getDay());
//  console.log(dayzNext);
//  console.log(nextMonthDayz);
//  console.log(curDayz);
//    console.log(firstDay);
//    console.log(7-((firstDay.getDay() + dayz))%7);
  var stringCal = "";
  total = 0;
  stringCal += '<tr class = "border"><th class = "d-flex flex-row justify-content-start"><input type = "text" placeHolder = "MM" class = "monthInp"><input type = "text" placeHolder = "DD" class = "dayInp"><input type = "text" placeHolder = "YYYY" class = "yearInp"></th></tr>  <tr class = "border"><th colspan="1" class = "cellz bg-white" id = "calendarHeader"></input></th> <th colspan="1" class = "cellz bg-white" id = "calendarHeader"><a href = "#" onclick = "moveCalUp();"><img alt = "Move back a month." src = "resources/calendar/leftArrow1.png" class = "arrow" onmousedown = "changeArrow(this,event)" onmouseup = "changeArrow(this,event)" onmouseout = "changeArrow(this,event)" id = "leftArrow"></a></th><th colspan="3" class = "cellz align-items-center bg-white" id = "calendarHeader">' + months[curMonthz] + ' ' + curYearz +  '</th><th colspan="1" class = "cellz bg-white" id = "calendarHeader"><a href = "#" onclick = "moveCalDown();"><img alt = "Move forward a month." src = "resources/calendar/rightArrow1.png" class = "arrow" onmousedown = "changeArrow(this,event)" onmouseup = "changeArrow(this,event)" onmouseout = "changeArrow(this,event)" id = "rightArrow"></a></th> <th colspan="1" class = "cellz bg-white" id = "calendarHeader"></th></tr>';
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
      if(total < firstDay.getDay() || total >= firstDay.getDay() + curDayz)
      {
         stringCal += ('<td class="cellz  border notMonth"><div class = "datez d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
//          stringCal += ('<td class="cellz  border text-muted"><div class = "datez d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + pad(tempDay.getMonth() + 1) + '</div>/<div>' + pad(tempDay.getDate()) + '</div>/<div>' + (tempDay.getFullYear()) + '</div></div></td>');
      }
      else
      { 
          if((monthz == curMonthz)&&(curYearz == yearz)&&(firstDay.getDay() + todayz.getDate() - 1 == total))
          {
            stringCal += ('<td class="cellz  border text-white bg-primary"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
//            stringCal += ('<td class="cellz  bordertext-white bg-primary"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + pad(tempDay.getMonth() + 1) + '</div>/<div>' + pad(tempDay.getDate()) + '</div>/<div>' + (tempDay.getFullYear()) + '</div></div></td>');
          }
          else
          {
            stringCal += ('<td class="cellz  border text-dark bg-white"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
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