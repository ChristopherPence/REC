//
//_____________________________________________________________________________________________________________________________
//GLOBAL VARIABLES
var total = 0;                                                          //         
var todayz = new Date();                                                //
var yearz = todayz.getFullYear();                                       //
var monthz = todayz.getMonth();                                         //
var dayzNext = new Date(yearz, monthz+1, 0).getDate();                  //
var curDate = new Date();                                               //
var curYearz = todayz.getFullYear();                                    //
var curMonthz = todayz.getMonth();                                      //
var curDayz = curDayz = new Date(curYearz, curMonthz+1, 0).getDate();   //
var firstDay;                                                           //
var nextMonthDayz;                                                      //
var totalDay;                                                           //
var cursorNext = 0;                                                     //
var dragged = 0;                                                        //

//
var fullWeek = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
var smallWeek = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

//_____________________________________________________________________________________________________________________________
//
window.onresize = cellzChange;
window.onload = makeCalendar;

//_____________________________________________________________________________________________________________________________
//
function changeArrow(elem,eve)
{
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

//
function imageChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  if(widthz < 1200)
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

//
function cellzChange() 
{
  var heightz = window.innerHeight;
  var widthz = window.innerWidth;
  var divHeight;
  imageChange();
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
  $("#yearInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("");
}

//_____________________________________________________________________________________________________________________________
//
function moveCalUp() 
{
  //when whole new month above
  curDate = new Date(curYearz, curMonthz-1, 1);
  curMonthz = curDate.getMonth();
  curYearz = curDate.getFullYear();
  curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
  makeCalendar();

}

//
function moveCalDown() 
{
  //when whole new month above
  curDate = new Date(curYearz, curMonthz+1, 1);
  curMonthz = curDate.getMonth();
  curYearz = curDate.getFullYear();
  curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
  makeCalendar();
}

//_____________________________________________________________________________________________________________________________
//
function makeCalendar()
{
  var counter = 0;
  firstDay = new Date(curYearz, curMonthz, 1);
  nextMonthDayz = 7-((firstDay.getDay() + curDayz))%7;
  if(nextMonthDayz == 7)
  {
    nextMonthDayz = 0;
  }
  totalDay = firstDay.getDay() + curDayz + nextMonthDayz;
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
  tempDay = new Date(tempDay.setDate(tempDay.getDate()-firstDay.getDay()));
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
      }
      else
      { 
          if((monthz == curMonthz)&&(curYearz == yearz)&&(firstDay.getDay() + todayz.getDate() - 1 == total))
          {
            counter++;
            stringCal += ('<td class="cellz  border today"><a href = "#" class = "todayLink h-100 w-100" onclick="angular.element(this).scope().run(this)" id = "' + counter + '"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></a></td>');
          }
          else
          {
            counter++;
            stringCal += ('<td class="cellz  border monthDays"><a href = "#" class = "monthDaysLink h-100 w-100" onclick="angular.element(this).scope().run(this)" id = "' + counter + '"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1 sizer"><div>' + (tempDay.getDate()) + '</div></div></a></td>');
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

//_____________________________________________________________________________________________________________________________
//
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

//
function nextInp(el,event)
{
  if(event.keyCode == 39 && cursorNext)
  {
     goNext(el,event,1);
  }
  if(event.keyCode == 37 && $(el).prop("selectionStart")==0)
  {
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

//
function goNext(el,event,num)
{
  textboxes = $("input");
    currentBoxNumber = textboxes.index(el);
    if(num == 0 && el.id == "yearInp")
    {
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

//
function goBack(el,event)
{
  textboxes = $("input");
    currentBoxNumber = textboxes.index(el);
     if (textboxes[currentBoxNumber - 1] != null) {
        nextBox = textboxes[currentBoxNumber - 1];
        nextBox.focus();
        nextBox.select();
    }
    event.preventDefault();
    return false;
}

//
function searchDate()
{
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
    $("#" + daySearch).click();
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
}

//_____________________________________________________________________________________________________________________________
//
var app = angular.module('myApp', ['ngCookies']);
  app.controller('customersCtrl', function($scope, $http) {
    $scope.cal = "calendarz"; 
    $scope.run = function(el){
        $http({
            method : "get",
            url : '/getDatesEvents?year='+curYearz+'&month='+(curMonthz+1)+'&day='+el.id
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
            $(".modal").modal("show");
            $("#modalDate").html("Date: " + (curMonthz+1) + "/" + el.id + "/" + curYearz);
            imageChange();
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

//_____________________________________________________________________________________________________________________________
//
function pad(num) 
{
  var s = "00" + num;
  return s.substr(("" + num).length); 
}