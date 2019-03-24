var expanded = false;
var token;
var studentId;
let tableBody = document.getElementById("table_body");
let Login = document.getElementById("login");
// let showLogout = document.getElementById("show-logout");

async function getCourseList() {
    let courseArray = {};
    //token = localStorage.getItem('token');
    //localStorage.setItem('baseurl', baseUrl)
    console.log(localStorage.getItem('baseurl'))
    console.log("get post " + token)
    await fetch('http://localhost:8080/api/courses/get')
        .then(r => r.json())
        .then(json => {
                courseArray = json
            }
        );
    for (let course of courseArray) {
        tableBody.innerHTML += '<div class="col-lg-4 col-md-6">\n' +
            '                    <div class="categorie-item">\n' +
            '                    <div class="ci-thumb set-bg" data-setbg="img/categories/1.jpg"></div>\n' +
            '                    <div class="ci-text">\n' +
            '                    <h5>' + course.courseName + '</h5>\n' +
            '                    <p>' + course.description + '</p>\n' +
            '                    </div>\n' +
            '                    </div>\n' +
            '                    </div>';
    }
};


$(document).ready(function () {

    $("#submitButton").click(function (event) {

        // Stop default form Submit.
        event.preventDefault();

        // Call Ajax Submit.

        ajaxSubmitForm();

    });
    //loginButton();
});

function ajaxSubmitForm() {
    var data = new FormData();
    data.append('file', jQuery('#fileUploadForm')[0].files[0]);
    $("#submitButton").prop("disabled", true);

    $.ajax({
        url: 'http://localhost:8080/upload/3',
        type: 'POST',
        method: 'POST',
        enctype: 'multipart/form-data',
        data: data,

        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function (data, textStatus, jqXHR) {

            $("#result").html(data);
            console.log("SUCCESS : ", data);
            console.log(document.getElementById("three").value)
            console.log(document.getElementById("wFromTime").value)
            console.log(document.getElementById("wToTime").value)
            $("#submitButton").prop("disabled", false);
            $('#fileUploadForm')[0].reset;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#result").html(jqXHR.responseText);
            console.log("ERROR : ", jqXHR.responseText);
            $("#submitButton").prop("disabled", false);
        }
    });
}

function loginButton() {
    console.log(token);
    Login.innerHTML = "";
    Login.innerHTML = '<button class="site-btn header-btn" id="login">Login or Sign up</button>';
    document.getElementById("login").onclick = function () {
        modal.style.display = "block";
    }
}

function logoutButton() {
    Login.innerHTML = "";
    Login.innerHTML = '<button class="site-btn header-btn" id="logout">Logout</button>';
    document.getElementById("login").onclick = $.ajax({
        url: 'http://localhost:8080/logout',
        datatype : "application/json",
        contentType: "text/plain",
        success: function(){
            loginButton();
        }
    });
    // document.getElementById("logout").onclick = loginButton();
}

function onloadWindow(){
    if (token == null)
        loginButton();
    else
        logoutButton();
}

window.onload = getCourseList();
window.onload = onloadWindow();

var baseUrl = 'http://localhost:8080/api';
localStorage.setItem('baseurl', baseUrl)
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

async function signUp() {
    let user;
    var username = document.getElementById("regUsername").value;
    var password = document.getElementById("regPassword").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let skype = document.getElementById("skype").value;
    let birthDate = document.getElementById("birthDate").value;
    let freeDate = document.getElementById("freeDate").value;
    let freeTime = document.getElementById("freeTime").value;
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
    await fetch(baseUrl + "/auth", {
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
                localStorage.setItem('username', username)
                console.log("tok: " + token)
                localStorage.setItem('token', token)
                token = localStorage.getItem('token')
            })
    })
    logoutButton()
    console.log("token: " + token + " username:  " + localStorage.getItem('username'))
}

