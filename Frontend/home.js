var obj;
localStorage.removeItem("Id");
let httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "http://localhost:8080/list");
httpRequest.send();
httpRequest.onload = function () {
  obj = JSON.parse(httpRequest.responseText);
  loadTodos();
}
function loadTodos() {
  var index = 0;
  for (index = 0; index < obj.length; index++) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(index + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var isCompleted = obj[index].isCompleted;
    var description;
    var date;
    if (isCompleted) {
      description = "<strike>" + obj[index].description + "</strike>";
      date = new Date(obj[index].date);
      date = date.toDateString();
      date = "<strike>" + date + "</strike>";
    }
    else {
      description = obj[index].description;
      date = new Date(obj[index].date);
      date = date.toDateString();
    }
    cell1.innerHTML = description;
    cell2.innerHTML = date;
    if (obj[index].isCompleted == true) {
      cell3.innerHTML = "<input type = 'checkbox' value =" + index + " checked onclick = 'isComplete(this)' id = 'isComplete' >";
    }
    else {
      cell3.innerHTML = "<input type = 'checkbox' value =" + index + " onclick = 'isComplete(this)' id = 'isComplete' >";
    }
    // cell4.innerHTML = <a href = "todopage2.html;" onclick = "this.href='Page2.htm?name=' + document.getElementById('txtName').value">Send</a>
    cell4.innerHTML = "<button class = 'btn btn-warning' id = 'edit' onclick = editTodo(this) value= " + index + ">Edit</button></a>";
    cell5.innerHTML = "<button class = 'btn btn-danger' onclick = deleteOneTodo(this) value=" + index + ">&#10006;</button>";
  }
}
function deleteOneTodo(button) {
  var id = obj[button.value].id;
  fetch("http://localhost:8080/list/" + id, {
    method: 'DELETE',
  }).then(function (response) {
    window.location.href = "/todo.html";
    return response;
  }).then(function (data) {
    console.log(data);
  })
}
function isComplete(button) {
  var index = button.value;
  var description = obj[index].description;
  var date = obj[index].date;
  var id = obj[index].id;
  var isCompleted = obj[index].isCompleted;
  isCompleted = !isCompleted;
  fetch("http://localhost:8080/list/" + id, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      description: description,
      date: date,
      isCompleted: isCompleted
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  }).then(function (response) {
    window.location.href = "/todo.html";
    return response;
  }).then(function (data) {
    console.log(data);
  });
}
function editTodo(button) {
  var index = button.value;
  const id = obj[index].id;
  localStorage.setItem("Id", id);
  window.location.href = "todoPage2.html";
}