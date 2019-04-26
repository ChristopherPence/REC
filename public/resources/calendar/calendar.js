//this page displays and creates calendar elements for the user. This page also allows for the obtaining of the event data for one 
//of the dates, the creation of the calendar, the searching for a particular date, and for dynamic sizing of certain elements.
//_____________________________________________________________________________________________________________________________
//GLOBAL VARIABLES
var total = 0;                                                          //the total number of day table cell elements created   
var todayz = new Date();                                                //the date variable of TODAY which never changes
var yearz = todayz.getFullYear();                                       //the year when the page is loaded
var monthz = todayz.getMonth();                                         //the month when the page is loaded
var curDate = new Date();                                               //the current date that the user is at in their search
var curYearz = todayz.getFullYear();                                    //the current year that the user is at in their search
var curMonthz = todayz.getMonth();                                      //the current month that the user is at in their search
var curDayz = new Date(curYearz, curMonthz+1, 0).getDate();             //the current day that the user is at in their search
var firstDay;                                                           //the first day (0-6) of the week of the month the user is at
var nextMonthDayz;                                                      //the number of days to be added after the month to make the calendar
var totalDay;                                                           //the number of days table cells that need to be added to the calendar
var cursorNext = 0;                                                     //1 if the cursor should move to the next input when pressing right arrow (0 if not)
var dragged = 0;                                                        //0 if the arrow was dragged (1 means it was just clicked). Used to ensure 
                                                                        //left and right arrows dont get dragged and stay red

//this is the array of the days that are needed to display the calendar 
var smallWeek = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
//this is an array of the months for displaying the current month to the user
var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

//_____________________________________________________________________________________________________________________________
//on window events perform functions

//this ensures that when the page is resized, that all the elements within resize with it
window.onresize = cellzChange;
//this ensures that when the window is loaded that the calendar is made for the user
window.onload = makeCalendar;

//_____________________________________________________________________________________________________________________________
//thses are funcitons that change the style of elements within the calendar webpage (like dynamic sizing)

//this ensures that if the month arrow is dragged or clicked, that it becomes the appropiate color
function changeArrow(elem,eve)
{
  //if the arrow is clicked, let its color turn red for active
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
  //if the arrow is dragged, keep the color of the arrow normal
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
  //if the arrow is dragged out of the image space, return its color to not active
  if(elem.id == "leftArrow" && eve.type == "mousedout")
  {
    $('#leftArrow').attr("src","resources/calendar/leftArrow1.png");
  }
  else if(elem.id == "rightArrow" && eve.type == "mousedout")
  {
    $('#rightArrow').attr("src","resources/calendar/rightArrow1.png");
  }
}

//this function changes the class of the modal information of events so that the title 
//and dates look good
function imageChange() 
{
  var heightz = window.innerHeight; //the height of the window in pixels
  var widthz = window.innerWidth;   //the width of the window in pixels
  
  //if the width of the page becomes less than a certain size, make the information display
  //like a column
  if(widthz < 1200)
  {
    $('.headingz').addClass('flex-column');
  }
  //otherwise keep the title and the date on the same line
  else
  {
    $('.headingz').removeClass('flex-column');
  }
}

//this function changes the cells so that the calendar dynamically resizes with the window
function cellzChange() 
{
  var heightz = window.innerHeight; //the height of the window in pixels
  var widthz = window.innerWidth;   //the width of the window in pixels
  var divHeight;                    //this is the height that each cell should have
  
  //resize any of the events if the page resizes with the modal up
  imageChange();
  
  //change the calendar width
  $(".calendar").css("width", widthz*0.8);
  
  //ensure the cells and arrows have a minimum height to them
  if(heightz < 500)
  {
    $(".cellz").css("height", 45);
    $(".arrow").css("height", 30);
  }
  //otherwise dynamically size the arrow and table cell elements with the page size
  else
  {
    divHeight = $(".sizer").css('height');
    divHeight = parseInt(divHeight.substring(0,divHeight.length-2))*2.3;
    $(".cellz").css('height',divHeight);
    //keep the arrow size within the bounds of the cells
    if(divHeight*0.6 < parseFloat($(".cellz").css('width')) * 0.8)
    {
      $(".arrow").css("height", divHeight*0.6);
    }
    else
    {
      $(".arrow").css("height", parseFloat($(".cellz").css('width')) * 0.8);
    }
  }
  
  //style the height of the inputs so that they are of the needed width of their placeholders
  $('#placeHolder').html("MM");
  $("#monthInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("DD");
  $("#dayInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("YYYY");
  $("#yearInp").css('width',$('#placeHolder').width() + 16);
  $('#placeHolder').html("");
}

//_____________________________________________________________________________________________________________________________
//this function moves the calendar to the last month (month before)
function moveCalUp() 
{
  //change the date
  curDate = new Date(curYearz, curMonthz-1, 1);
  curMonthz = curDate.getMonth();
  curYearz = curDate.getFullYear();
  curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
  
  //remake the calendar
  makeCalendar();

}

//this function moves the calendar to the next month (month after)
function moveCalDown() 
{
  //change the date
  curDate = new Date(curYearz, curMonthz+1, 1);
  curMonthz = curDate.getMonth();
  curYearz = curDate.getFullYear();
  curDayz = new Date(curYearz, curMonthz+1, 0).getDate();
  
  //remake the calendar
  makeCalendar();
}

//_____________________________________________________________________________________________________________________________
//this function creates the calendar for whatever month of year. This will 
//also indicated whatever day is "TODAY"
function makeCalendar()
{
  var counter = 0;                                      //the counter of the day of the month
  firstDay = new Date(curYearz, curMonthz, 1);          //the (0-6) sun to sat of the first day of the month
  var stringCal = "";                                   //the string of all the elements in the calendar
  total = 0;                                            //the total number of days counter input into calendar
  nextMonthDayz = 7-((firstDay.getDay() + curDayz))%7;  //the number of days in the next month shown on the calendar
  var tempDay;                                          //first day of month before in calendar, then counter date after
  
  //this ensures if there are 7 days that can be shown in the next month, just show days of this month
  if(nextMonthDayz == 7)
  {
    nextMonthDayz = 0;
  }
  
  //this is the final  total of days in the calendar being shown (days of month before, now and after)
  totalDay = firstDay.getDay() + curDayz + nextMonthDayz;
  
  //the starting string of the calendar, the header. It is faster just to input it all at the same time 
  //rather than inputing a lot of variables into the calendar
  stringCal += '<tr class = "dateText bg-transparent"><th colspan="4" class = "bg-transparent p-0 dateText"><div class = "h-100 rounded-top d-flex flex-row flex-wrap align-items-center justify-content-center mr-5 tabs"><input type = "text" placeHolder = "MM" maxlength= "2" class = "ml-2 mt-2 mb-2" id = "monthInp" onkeyup = "nextInp(this,event)" onkeydown = "moverRight(this,event)"><input type = "text" placeHolder = "DD" maxlength= "2" class = "mt-2 mb-2" id = "dayInp" onkeyup = "nextInp(this,event)"  onkeydown = "moverRight(this,event)"><input type = "text" placeHolder = "YYYY" maxlength= "4" class = "mt-2 mb-2 mr-2" id = "yearInp" onkeyup = "nextInp(this,event)"><button type="button" class="border btn btn-light pb-1 pt-1 pl-2 pr-2 mr-2 mt-2 mb-2 border-dark" id = "search" onclick="searchDate()">Search</button><div id = "placeHolder"></div></div></th><th colspan="3" class = "bg-transparent"></th></tr>  <tr class = "borderMixed borderTop"><th colspan="1" class = "cellz bg-white" id = "calendarHeader"></input></th> <th colspan="1" class = "cellz bg-white" id = "calendarHeader"><a href = "#" onclick = "moveCalUp();"><img alt = "Move back a month." src = "resources/calendar/leftArrow1.png" class = "arrow" onmousedown = "changeArrow(this,event)" onmouseup = "changeArrow(this,event)" onmouseout = "changeArrow(this,event)" id = "leftArrow"></a></th><th colspan="3" class = "cellz align-items-center bg-white" id = "calendarHeader">' + months[curMonthz] + ' ' + curYearz +  '</th><th colspan="1" class = "cellz bg-white" id = "calendarHeader"><a href = "#" onclick = "moveCalDown();"><img alt = "Move forward a month." src = "resources/calendar/rightArrow1.png" class = "arrow" onmousedown = "changeArrow(this,event)" onmouseup = "changeArrow(this,event)" onmouseout = "changeArrow(this,event)" id = "rightArrow"></a></th> <th colspan="1" class = "cellz bg-white" id = "calendarHeader"></th></tr><tr class = "bg-light borderMixed">';
  
  //input the days cells Mon. Tues, etc.. into the calendar
  for(var k = 0; k<7; k++)
  {
    stringCal += '<th class="cellz weekDayz  border text-muted"><div class = "ml-1 mr-1">' + smallWeek[k] + '</div></th>'
  }
  stringCal += '</tr>';
  
  //set the first date to be the counter for days displayed in the calendar
  tempDay = new Date(curYearz, curMonthz, 1);
  tempDay = new Date(tempDay.setDate(tempDay.getDate()-firstDay.getDay()));
  
  //create the cellz for the days of the calendar, each of the current month clickable for events
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
      //if the day is not within the current month
      if(total < firstDay.getDay() || total >= firstDay.getDay() + curDayz)
      {
       stringCal += ('<td class="cellz  border notMonth"><div class = "datez d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></td>');
      }
      else
      { 
        //if the day is "today"
        if((monthz == curMonthz)&&(curYearz == yearz)&&(firstDay.getDay() + todayz.getDate() - 1 == total))
        {
          counter++;
          stringCal += ('<td class="cellz  border today"><a href = "#" class = "todayLink h-100 w-100" onclick="angular.element(this).scope().run(this)" id = "' + counter + '"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1"><div>' + (tempDay.getDate()) + '</div></div></a></td>');
        }
        //if the day isn't "today" and apart of the current month
        else
        {
          counter++;
          stringCal += ('<td class="cellz  border monthDays"><a href = "#" class = "monthDaysLink h-100 w-100" onclick="angular.element(this).scope().run(this)" id = "' + counter + '"><div class = "d-flex flex-wrap justify-content-center ml-1 mr-1 sizer"><div>' + (tempDay.getDate()) + '</div></div></a></td>');
        }
      }
      
      //iterate the date and dat counter
      tempDay = new Date(tempDay.setDate(tempDay.getDate()+1));
      total++;
    }
    stringCal += '</tr>';
  }
  
  //input the calendar cod einto the webpage
  $('#calendarz').html(stringCal);
  //style the calendar to fit the window size
  cellzChange();
}

//_____________________________________________________________________________________________________________________________
//these functions deal with the date search inputs

//this function determines if the right arrow key allows the input to go to the next input
function moverRight(el,event)
{
  //if the cursor is in the second position, have the right arrow key move over
  if($(el).prop("selectionStart")==2)
  {
    cursorNext = 1;
  }
  //if right arrow key pressed and not in second position, don't do anything
  else
  {
    cursorNext = 0;
  }
}

//if the cursor should go to the next or last date search input box, transfer it over
function nextInp(el,event)
{
  //if the right arrow key is pressed and should move cursor to next input
  if(event.keyCode == 39 && cursorNext)
  {
     goNext(el,event,1);
  }
  //if the left arrow key is pressed and is in the first position of the input, go to last input
  if(event.keyCode == 37 && $(el).prop("selectionStart")==0)
  {
    goBack(el,event);
  }
  //if the day or month input is filled go to the next input
  else if(el.value.length == 2 && (el.id == "monthInp" || el.id == "dayInp") && event.keyCode != 9 && event.keyCode != 39 && event.keyCode != 37)
  {
    goNext(el,event,1);
  }
  //if enter is pressed go to the next input, if it is the year however go to the actual date for events
  else if (event.keyCode == 13) 
  {
    goNext(el,event,0);
  }
}

//this function moves the cursor over to the next input. If the input is the year with "enter", also show the 
//events of the searched date
function goNext(el,event,num)
{
  textboxes = $("input");
  currentBoxNumber = textboxes.index(el);
  //go to the event date and show the modal
  if(num == 0 && el.id == "yearInp")
  {
    var divLink = document.getElementById("search");
    divLink.click();
  }
  //go to the next input with the cursor
  else if (textboxes[currentBoxNumber + 1] != null) 
  {
    nextBox = textboxes[currentBoxNumber + 1];
    nextBox.focus();
    nextBox.select();
  }
  event.preventDefault();
  return false;
}

//this function goes back with the user cursor to the last input
function goBack(el,event)
{
  textboxes = $("input");
  currentBoxNumber = textboxes.index(el);
   if (textboxes[currentBoxNumber - 1] != null) 
   {
    nextBox = textboxes[currentBoxNumber - 1];
    nextBox.focus();
    nextBox.select();
  }
  event.preventDefault();
  return false;
}

//this function changes the date for whatever input the user puts into the search. This also has some alert //error checking for incorrect user input
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
//this is the angular module that obtains the data to show the events for a certain day
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
//this function pads any number with 0's so that it is always 2 digits of string
function pad(num) 
{
  var s = "00" + num;
  return s.substr(("" + num).length); 
}