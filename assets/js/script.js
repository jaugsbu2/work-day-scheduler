// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var taskForm = $('.time-block');
var dateEl = $('#currentDay')
// var textArea = $('textarea[name="task"]');
var tasks = []
var hourDiv0 = ('#hour-9')
var hourDiv1 = ('#hour-10')
var hourDiv2 = ('#hour-11')
var hourDiv3 = ('#hour-12')
var hourDiv4 = ('#hour-1')
var hourDiv5 = ('#hour-2')
var hourDiv6 = ('#hour-3')
var hourDiv7 = ('#hour-4')
var hourDiv8 = ('#hour-5')

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


  taskForm.on('click', 'button', function (event) {
    event.preventDefault();
    var divIDval = $(this).parent().attr('id');
    var divID = "#" + divIDval
    var divClicked = $(divID)
    var item = divClicked.children('textarea')


    var taskObj = {
      id: divID,
      task: item.val()
    }

    var found = tasks.findIndex(function (post, index) {
      if (post.id == divID)
        return true;
    });

    if (found != -1) {
      tasks[found].task = item.val()
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    else {
      tasks.push(taskObj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

  });




  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  getTime();
  function getTime() {
    var currHour = dayjs().format('hh');
    var currHournum = parseInt(currHour);
    var divChange

    for (i = 9; i < 18; i++) {
      divChange = $('#hour-' + i)
      var divIdstr = divChange.attr('id')
      var divIdnum = divIdstr.replace(/\D/g, '');
      var divNum = parseInt(divIdnum);

      if (currHournum == divNum) {
        divChange.attr('class', 'row time-block present');
      }
      else if (currHournum > divNum) {
        divChange.attr('class', 'row time-block past');
      }
      else {
        divChange.attr('class', 'row time-block future');
      };
    }

  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  };

  function renderTasks() {

    for (var i = 0; i < tasks.length; i++) {
      var divSaved = $(tasks[i].id);
      var taskSaved = divSaved.children('textarea')
      taskSaved.text(tasks[i].task);
    }

  }

  // }

  //
  // TODO: Add code to display the current date in the header of the page.
  var currDay = dayjs().format('dddd, MMMM D YYYY')
  dateEl.text('Today is: ' + currDay);
});
