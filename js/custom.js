let tableBody = document.getElementById("table_body");
let token;
let studentId;
let taskBody = document.getElementById("eventCalendar");
let file = document.getElementById("file").value;

async function signUp() {
    let user;
    var username = document.getElementById("regUsername").value;
    var password = document.getElementById("regPassword").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let skype = document.getElementById("skype").value;
    let birthDate = document.getElementById("birthDate").value;
    let url = "/reg/student";

    console.log(username + " " + birthDate)
    await fetch(baseUrl + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password,
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            skype: skype,
            birthDate: birthDate,
            rank: null,
            teacherName: null,
            lessons: null
        })
    }).then(function (response) {
        response.json()
            .then(function (usersObject) {
                console.log(usersObject)
            })
    })
}

async function signIn() {
     username = document.getElementById("username").value;
     password = document.getElementById("password").value;
     localStorage.setItem('username', username)
     fetch(baseUrl + "/auth", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(function (response) {
        response.json()
            .then(function (_data) {
                token = _data.token;
                localStorage.setItem('token', token)

            })
    })
    console.log(token)
}


function getStudentId() {
    token = localStorage.getItem('token')
    username = localStorage.getItem('username')
    console.log("username: " + username + "token: " + token)
    fetch(baseUrl + "/get/id/"+username, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    }).then(function (response) {
        response.json()
            .then(function (data) {
                studentId = data;
                localStorage.setItem('studentId', studentId)
            })
    })
    console.log(localStorage.getItem('studentId'))
}

async function getTasks(){
    let tasks =[];
    studentId = localStorage.getItem('studentId')
    console.log(studentId)
    await fetch(localStorage.getItem('baseurl') + '/tasks/get/'+studentId,{
        headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }

    })
        .then(r => r.json())
        .then(json => {
            tasks = json
            console.log(tasks)
        })
    taskBody.innerHTML = "";
    for(let task of tasks){

        taskBody.innerHTML+='<div class="col-lg-4 col-md-6">\n' +
            '                    <div class="categorie-item">\n' +
            '                    <div class="ci-thumb set-bg" data-setbg="img/categories/1.jpg"></div>\n' +
            '                    <div class="ci-text">\n' +
            '                    <h5>'+task.name+'</h5>\n' +
            '                    <p>'+task.url+'</p>\n' +
            '                    </div>\n' +
            '                    </div>\n' +
            '                    </div>';

        console.log(task.name)
    }

}

$(document).ready(function() {
    $("#upload-file-input").on("change", uploadFile);
});

/**
 * Upload the file sending it via Ajax at the Spring Boot server.
 */
function uploadFile() {

    $.ajax({
        url: "http://localhost:8080/upload/3?file=hgf.jpg",
        type: "POST",
        data: new FormData($("#upload-file-form")[0]),
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,

        success: function () {
            console.log(file)
            console.log("success")
        },
        error: function () {
            console.log(file)
            console.log("Error")
        }
    });
}

