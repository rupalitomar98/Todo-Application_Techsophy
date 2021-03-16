var form = document.getElementById("myForm");
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
}
var id = localStorage.getItem("Id");
var obj;
var description;
var date;
var isCompleted;
if (id != null) {
    document.getElementById("todo").innerHTML = "Edit Todo";
    document.getElementById("add").innerHTML = "Update";
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "http://localhost:8080/list/" + id);
    httpRequest.send();
    httpRequest.onload = function () {
        obj = JSON.parse(httpRequest.responseText);
        description = obj.description;
        date = obj.date;
        isCompleted = obj.isCompleted;
        document.querySelector('#description').value = description;
        date = new Date(date);
        date = convertDate(date);
        document.querySelector('#date').value = date;
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    description= document.querySelector('#description').value;
    date = document.querySelector('#date').value;
    console.log(date);
    if(description==""){
        document.getElementById('description').style.borderColor = "red";
        return;
    }
    if(date=="")
    {
        document.getElementById('date').style.borderColor = "red";
        return;
    }
    if (id == null) {
        var des = document.querySelector('#description').value;
        var dt = document.querySelector('#date').value;
        console.log(dt);
        fetch("http://localhost:8080/list", {
            method: 'POST',
            body: JSON.stringify({
                description: des,
                date: dt,
                isCompleted: false
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(function (response) {
            window.location.href = "/todo.html";
            return response;
        }).then(function (data) {
            console.log(data);
        })
    } else {
        fetch("http://localhost:8080/list/" + id, {
            method: 'PUT',
            body: JSON.stringify({
                id:id,
                description: document.querySelector('#description').value,
                date: document.querySelector('#date').value,
                isCompleted: isCompleted
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(function (response) {
            localStorage.removeItem("Id");
            window.location.href = "/todo.html";
            return response;
        }).then(function (data) {
            console.log(data);
        })
    }

});