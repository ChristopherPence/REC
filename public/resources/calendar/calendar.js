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
var cursorNext = 0;
var fullWeek = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
var smallWeek = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var dragged = 0;
window.onresize = cellzChange;
window.onload = makeCalendar;

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
  var divHeight;
  $(".calendar").css("width", widthz*0.8);
  if(heightz < 500)
  {
    $(".cellz").css("height", 45);
    $(".arrow").css("height", 30);
  }
  else
  {
    divHeight = $(".sizer").css('height');
    divHeight = parseInt(divHeight.substring(0,divHeight.length-2))*2.3;
    $(".cellz").css('height',divHeight);
    console.log("JK");
    console.log(divHeight);
    console.log(parseFloat($(".cellz").css('width')));
    if(divHeight*0.6 < parseFloat($(".cellz").css('width')) * 0.8)
    {
      $(".arrow").css("height", divHeight*0.6);
    }
    else
    {
      $(".arrow").css("height", parseFloat($(".cellz").css('width')) * 0.8);
    }
  }
  $('#placeHolder').html("MM");
  $("#monthInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("DD");
  $("#dayInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("YYYY");
  console.log($('#placeHolder').width());
  $("#yearInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("");
}

function moveCalUp() {
//  console.log(firstDay);
//  console.log(firstDay.getDay());

  //when whole new month above
  curDate = new Date(curYearz, curMonthz-1, 1);
  curMonthz = curDate.getMonth();
  curYearz = curDate.getFullYear();
  curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
  makeCalendar();

}

function moveCalDown() {

//  console.log(firstDay);
//  console.log(firstDay.getDay());
  //when whole new month above
  curDate = new Date(curYearz, curMonthz+1, 1);
  curMonthz = curDate.getMonth();
  curYearz = curDate.getFullYear();
  curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
  makeCalendar();
}

function makeCalendar()
{
  firstDay = new Date(curYearz, curMonthz, 1);
  nextMonthDayz = 7-((firstDay.getDay() + curDayz))%7;
  if(nextMonthDayz == 7)
  {
    nextMonthDayz = 0;
  }
  totalDay = firstDay.getDay() + curDayz + nextMonthDayz;
//  console.log(firstDay.getDay());
//  console.log(dayzNext);
//  console.log(nextMonthDayz);
//  console.log(curDayz);
//    console.log(firstDay);
//    console.log(7-((firstDay.getDay() + dayz))%7);//<button type="button" class="btn btn-light search">Date</button>
  var stringCal = "";
  total = 0;
  stringCal += '<tr class = "dateText bg-transparent"><th colspan="4" class = "bg-transparent p-0 dateText"><div class = "h-100 rounded-top d-flex flex-row flex-wrap align-items-center justify-content-center mr-5 tabs"><input type = "text" placeHolder = "MM" maxlength= "2" class = "ml-2 mt-2 mb-2" id = "monthInp" onkeyup = "nextInp(this,event)" onkeydown = "moverRight(this,event)"><input type = "text" placeHolder = "DD" maxlength= "2" class = "mt-2 mb-2" id = "dayInp" onkeyup = "nextInp(this,event)"  onkeydown = "moverRight(this,event)"><input type = "text" placeHolder = "YYYY" maxlength= "4" class = "mt-2 mb-2 mr-2" id = "yearInp" onkeyup = "nextInp(this,event)"><button type="button" class="border btn btn-light pb-1 pt-1 pl-2 pr-2 mr-2 mt-2 mb-2 border-dark" id = "search" onclick="searchDate()">Search</button><div id = "placeHolder"></div></div></th><th colspan="3" class = "bg-transparent"></th></tr>  <tr class = "borderMixed borderTop"><th colspan="1" class = "cellz bg-white" id = "calendarHeader"></input></th> <th colspan="1" class = "cellz bg-white" id = "calendarHeader"><a href = "#" onclick = "moveCalUp();"><img alt = "Move back a month." src = "resources/calendar/leftArrow1.png" class = "arrow" onmousedown = "changeArrow(this,event)" onmouseup = "changeArrow(this,event)" onmouseout = "changeArrow(this,event)" id = "leftArrow"></a></th><th colspan="3" class = "cellz align-items-center bg-white" id = "calendarHeader">' + months[curMonthz] + ' ' + curYearz +  '</th><th colspan="1" class = "cellz bg-white" id = "calendarHeader"><a href = "#" onclick = "moveCalDown();"><img alt = "Move forward a month." src = "resources/calendar/rightArrow1.png" class = "arrow" onmousedown = "changeArrow(this,event)" onmouseup = "changeArrow(this,event)" onmouseout = "changeArrow(this,event)" id = "rightArrow"></a></th> <th colspan="1" class = "cellz bg-white" id = "calendarHeader"></th></tr>';
  stringCal += '<tr class = "bg-light borderMixed">';
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
    if(i == totalDay/7 - 1)
    {
      stringCal += '<tr class = "borderMixed borderBottom">';
    }
    else
    {
      stringCal += '<tr class = "borderMixed">';
    }
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
            stringCal += ('<td class="cellz  border today"><a href = "#" class = "todayLink h-100 w-100"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></a></td>');
//            stringCal += ('<td class="cellz  bordertext-white bg-primary"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + pad(tempDay.getMonth() + 1) + '</div>/<div>' + pad(tempDay.getDate()) + '</div>/<div>' + (tempDay.getFullYear()) + '</div></div></td>');
          }
          else
          {
            stringCal += ('<td class="cellz  border monthDays"><a href = "#" class = "monthDaysLink h-100 w-100"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1 sizer"><div>' + (tempDay.getDate()) + '</div></div></a></td>');
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
}

function moverRight(el,event)
{
  if($(el).prop("selectionStart")==2)
  {
    cursorNext = 1;
  }
  else
  {
    cursorNext = 0;
  }
}

function nextInp(el,event)
{
  console.log($('input').prop("selectionStart"));
  console.log(event);
  console.log(el.value.length);
  console.log(el);
  if(event.keyCode == 39 && cursorNext)
  {
     goNext(el,event,1);
  }
  if(event.keyCode == 37 && $(el).prop("selectionStart")==0)
  {
    console.log("EOO");
    goBack(el,event);
  }
  else if(el.value.length == 2 && (el.id == "monthInp" || el.id == "dayInp") && event.keyCode != 9 && event.keyCode != 39 && event.keyCode != 37)
  {
    goNext(el,event,1);
  }
  else if (event.keyCode == 13) 
  {
    goNext(el,event,0);
  }
  
}

function goNext(el,event,num)
{
  textboxes = $("input");
    currentBoxNumber = textboxes.index(el);
  console.log("HEYOOOO" + currentBoxNumber);
    if(num == 0 && currentBoxNumber == 2)
    {
      console.log("GOTIT");
      var divLink = document.getElementById("search");
      divLink.click();
    }
    else if (textboxes[currentBoxNumber + 1] != null) {
        nextBox = textboxes[currentBoxNumber + 1];
        nextBox.focus();
        nextBox.select();
    }
    event.preventDefault();
    return false;
}

function goBack(el,event)
{
  textboxes = $("input");
    currentBoxNumber = textboxes.index(el);
  console.log("Pool" + currentBoxNumber);
     if (textboxes[currentBoxNumber - 1] != null) {
        nextBox = textboxes[currentBoxNumber - 1];
        nextBox.focus();
        nextBox.select();
    }
    event.preventDefault();
    return false;
}

function searchDate()
{
  console.log($("#yearInp").val());
  if($("#monthInp").val().length == 0 && $("#dayInp").val().length == 0 && $("#yearInp").val().length == 0)
  {
    alert("Please input a date to search for. Thank you.");
    return;
  }
  var monthSearch = parseInt($("#monthInp").val());
  if(!isNaN(monthSearch))
  {
    monthSearch -= 1;
  }
  var daySearch = parseInt($("#dayInp").val());
  var yearSearch = parseInt($("#yearInp").val());
  var searchDate = new Date(yearSearch,monthSearch,daySearch);
  var testDate;
  console.log(isNaN(searchDate));
  console.log(searchDate);
                            console.log(isNaN(monthSearch));
  if((isNaN(monthSearch) && $("#monthInp").val().length != 0) || (isNaN(daySearch) && $("#dayInp").val().length != 0) || (isNaN(yearSearch) && $("#yearInp").val().length != 0))
  {
    alert("Ensure that all of your inputs are numbers.");
    return;
  }
  if(monthSearch < 0 || monthSearch > 11)
  {
    alert("This is an invalid date. Please check your month.");
    return;
  }
    
  if($("#dayInp").val().length != 0)
  {
    if($("#yearInp").val().length == 0)
    {
      if($("#monthInp").val().length == 0)
      {
        testDate = new Date(curYearz,curMonthz+1, 0).getDate();
      }
      else
      {
        testDate = new Date(curYearz,monthSearch+1, 0).getDate();
      }
    }
    else
    {
      if($("#monthInp").val().length == 0)
      {
        testDate = new Date(searchDate,curMonthz+1, 0).getDate();
      }
      else
      {
        testDate = new Date(searchDate,monthSearch+1, 0).getDate();
      }
    }
    if(daySearch < 1 || testDate < daySearch)
    {
      alert("This is an invalid date. Please check your day.");
      return;
    }
    if($("#yearInp").val().length == 0)
    {
      yearSearch = curYearz;
    }
    if($("#monthInp").val().length == 0)
    {
      monthSearch = curMonthz;
    }
    curMonthz = monthSearch;
    curYearz = yearSearch;
    makeCalendar();
    return;
  }
  else
  {
    if($("#yearInp").val().length == 0)
    {
      yearSearch = curYearz;
    }
    if($("#monthInp").val().length == 0)
    {
      monthSearch = curMonthz;
    }
    curMonthz = monthSearch;
    curYearz = yearSearch;
    makeCalendar();
    return;
  }
  
  
  
  
  $("#myModal").modal("show");
  
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