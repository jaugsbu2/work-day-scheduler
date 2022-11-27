
var taskForm = $('.time-block');
var dateEl = $('#currentDay')
var tasks = []

$(function () {


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

  var currDay = dayjs().format('dddd, MMMM D YYYY')
  dateEl.text('Today is: ' + currDay);
});
