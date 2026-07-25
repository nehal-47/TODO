var todoItems = [];

function fetchCurrentDate() {
  var currentDate = new Date();
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var m = monthNames[currentDate.getMonth()];
  var d = currentDate.getDate();
  var y = currentDate.getFullYear();

  return d + " " + m + " " + y;
}

function fetchCurrentTime() {
  var now = new Date();
  var hrs = now.getHours();
  var mins = now.getMinutes();
  var period = hrs >= 12 ? "PM" : "AM";

  hrs = hrs % 12;
  hrs = hrs ? hrs : 12;
  mins = mins < 10 ? "0" + mins : mins;

  return hrs + ":" + mins + " " + period;
}

function resetInputField() {
  var inputEl = document.getElementById("taskInput");
  inputEl.value = "";
  inputEl.focus();
}

function addTask() {
  var inputVal = document.getElementById("taskInput").value.trim();
  var msgBox = document.getElementById("message");

  if (inputVal === "") {
    msgBox.innerText = "Please write something first!";
  } else {
    var itemObj = {
      title: inputVal,
      createdDate: fetchCurrentDate(),
      createdTime: fetchCurrentTime(),
      isDone: false
    };

    todoItems.push(itemObj);
    msgBox.innerText = "";

    renderActiveList();
    renderFinishedList();
    resetInputField();
  }
}

function markAsCompleted(idx) {
  todoItems[idx].isDone = true;
  renderActiveList();
  renderFinishedList();
}

function renderActiveList() {
  var content = "";
  var activeTotal = 0;

  for (var index = 0; index < todoItems.length; index++) {
    if (!todoItems[index].isDone) {
      activeTotal++;
      content += '<div class="task-card">';
      content += '  <input type="checkbox" class="task-checkbox" onChange="markAsCompleted(' + index + ')">';
      content += '  <div class="task-details">';
      content += '    <p class="task-text">' + todoItems[index].title + '</p>';
      content += '    <p class="task-datetime">' + todoItems[index].createdDate + ' | ' + todoItems[index].createdTime + '</p>';
      content += '  </div>';
      content += '</div>';
    }
  }

  if (activeTotal === 0) {
    content = '<p class="empty-text">Your active list is clear!</p>';
  }

  document.getElementById("pendingList").innerHTML = content;
}

function renderFinishedList() {
  var content = "";
  var finishedTotal = 0;

  for (var index = 0; index < todoItems.length; index++) {
    if (todoItems[index].isDone) {
      finishedTotal++;
      content += '<div class="task-card completed">';
      content += '  <input type="checkbox" class="task-checkbox" checked disabled>';
      content += '  <div class="task-details">';
      content += '    <p class="task-text completed-text">' + todoItems[index].title + '</p>';
      content += '    <p class="task-datetime">' + todoItems[index].createdDate + ' | ' + todoItems[index].createdTime + '</p>';
      content += '  </div>';
      content += '</div>';
    }
  }

  if (finishedTotal === 0) {
    content = '<p class="empty-text">Nothing finished yet.</p>';
  }

  document.getElementById("completedList").innerHTML = content;
}
