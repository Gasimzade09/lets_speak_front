
var expanded = false;
var token;
var userRole;
var privateId;
let tableBody = document.getElementById("table_body");
let Login = document.getElementById("login");
// let showLogout = document.getElementById("show-logout");

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
    }).then(async function (response) {
        response.json()
            .then(await function (_data) {
                token = _data.token;
                userRole = _data.userRole;
                privateId = _data.privateId;
                localStorage.setItem('username', username);
                localStorage.setItem('privateId', privateId);
                console.log("tok: " + token);
                console.log(userRole);
                localStorage.setItem('token', token);
                localStorage.setItem('userRole', userRole);
                token = localStorage.getItem('token')
            }).then(redirect)
    });
    //logoutButton()
    console.log("token: " + localStorage.getItem('token') + " username:  " + localStorage.getItem('username'));
}

function redirect(){
    console.log(privateId);
    //localStorage.setItem('privateId', privateId);
    if (userRole === 'ROLE_STUDENT'){
        window.location.href = "http://localhost:63342/lets_speak-front/student.html";
    }else if(userRole === 'ROLE_TEACHER'){
        window.location.href = "http://localhost:63342/lets_speak-front/teacher.html";
    }
}


async function getCourseList() {
    let courseArray = {};
    //token = localStorage.getItem('token');
    //localStorage.setItem('baseurl', baseUrl)
    console.log(localStorage.getItem('baseurl'));
    console.log("get post " + token);
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('username'))
    await fetch('http://localhost:8080/api/courses/get')
        .then(r => r.json())
        .then(json => {
                courseArray = json
            }
        );
    for (let course of courseArray) {
        tableBody.innerHTML += '<div class="col-lg-4 col-md-6">\n' +
            '                    <div class="categorie-item">\n' +
            '                    <div class="ci-thumb set-bg"><img src="img/categories/1.jpg"></div>\n' +
            '                    <div class="ci-text">\n' +
            '                    <h5>' + course.courseName + '</h5>\n' +
            '                    <p>' + course.description + '</p>\n' +
            '                    </div>\n' +
            '                    </div>\n' +
            '                    </div>';
    }
};


async function getTariffList(){
    let tariffArray = {};
    await fetch('http://localhost:8080/api/get/tariffs')
        .then(r => r.json())
        .then(json => {
                tariffArray = json
            }
        );
    for (let tariff of tariffArray){
        var foundPos = tariff.name.indexOf(" ", 0);
        let desc = tariff.name.substr(0, (foundPos+1)).toLowerCase();
        console.log(desc);
        document.getElementById("tariff-list").innerHTML += '<div class="mix col-lg-3 col-md-4 col-sm-6 '+desc+'">\n' +
            '<div class="course-item">\n' +
                '<div class="course-thumb set-bg" data-setbg="img/courses/1.jpg">\n' +
                    '<div class="price">Price:'+ tariff.price +'</div>\n' +
                '</div>\n' +
                '<div class="course-info">\n' +
                    '<div class="course-text">\n' +
                        '<h5>'+tariff.name+'</h5>\n' +
                        '<p>'+tariff.count+' Lessons '+tariff.timesAWeek+' days per week</p>\n' +
                        '<div class="students">lesson duration: '+tariff.duration+'</div>\n' +
                    '</div>\n' +
                '</div>\n' +
            '</div>\n' +
            '</div>\n';
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



async function ajaxSubmitForm() {
    let email = document.getElementById("tEmail").value;
    let name = document.getElementById("tName").value;
    let surname = document.getElementById("tSurname").value;
    var data = new FormData();
    data.append('file', jQuery('#v-upload')[0].files[0]);
    $("#submitButton").prop("disabled", true);

    $.ajax({
        url: 'http://localhost:8080/api/reg/teacher/'+email+'/'+name+'/'+surname,
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

            $("#submitButton").prop("disabled", false);
            $('#v-upload')[0].reset;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#result").html(jqXHR.responseText);
            console.log("ERROR : ", jqXHR.responseText);
            $("#submitButton").prop("disabled", false);
        }
    });
}
var uName;
var uPass;
var uEmail;
var uSurname;
var uSkype;
function regStudent(){
    const wrapper = document.createElement('div');
    wrapper.innerHTML =
        /*Username*/
        '<div class="input-group flex-nowrap">\n' +
        '<div class="input-group-prepend">\n' +
        '<span class="input-group-text" id="addon-wrapping">Username *</span>\n' +
        '</div>\n' +
        '<input required type="text" id="uEmail" name="email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping">\n' +
        '</div>'+

        /*Password*/

        '<div class="input-group flex-nowrap">\n' +
        '<div class="input-group-prepend">\n' +
        '<span class="input-group-text mine" id="addon-wrapping">Password *</span>\n' +
        '</div>\n'+
        '<input required type="password" id="uPass" class="form-control" name="pass" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping">\n' +
        '</div>'+

        /*Name*/
        '<div class="input-group flex-nowrap">\n' +
        '<div class="input-group-prepend">\n' +
        '<span class="input-group-text mine1" id="addon-wrapping">Name *</span>\n' +
        '</div>\n'+
        '<input type="name" required class="form-control" id="uName" name="name" placeholder="Name" aria-label="Name" aria-describedby="addon-wrapping">\n' +
        '</div>'+

        /*Surname*/
        '<div class="input-group flex-nowrap">\n' +
        '<div class="input-group-prepend">\n' +
        '<span class="input-group-text mine2" id="addon-wrapping">Surname *</span>\n' +
        '</div>\n'+
        '<input type="surname" required id="uSurname" class="form-control" name="surname" placeholder="Surname" aria-label="Surname" aria-describedby="addon-wrapping">\n' +
        '</div>'+

        /*Skype*/
        '<div class="input-group flex-nowrap">\n' +
        '<div class="input-group-prepend">\n' +
        '<span class="input-group-text mine3" id="addon-wrapping">Skype</span>\n' +
        '</div>\n'+
        '<input type="skype" class="form-control" id="uSkype" name="skype" placeholder="Skype" aria-label="Skype" aria-describedby="addon-wrapping">\n' +
        '</div>';

    swal({
        title: 'Registration for student',
        text: 'Please fill in all fields.',
        content: wrapper,
        button: 'SET',

    }).then(value => {
        uName = document.getElementById("uName").value;
        uPass = document.getElementById("uPass").value;
        uEmail = document.getElementById("uEmail").value;
        uSurname= document.getElementById("uSurname").value;
        uSkype = document.getElementById("uSkype").value;
        signUp(uName, uPass, uEmail, uSurname, uSkype);
    })


}

function loginButton() {
    console.log(token);
    Login.innerHTML = "";
    Login.innerHTML = '<button class="site-btn header-btn" id="login" >Sign in</button>';
    document.getElementById("login").onclick = function () {
        modal.style.display = "block";
    }
}

function logoutButton() {
    Login.innerHTML = "";
    Login.innerHTML = '<a href="index.html"><button class="site-btn header-btn" id="logout" onclick="deleteToken()">Logout</button></a>';

    // noinspection JSAnnotator
    //document.getElementById("logout").onclick = logOut();
}

async function deleteToken(){
    token = null;
    fetch(baseUrl + "/delete/token/"+localStorage.getItem('username'),{
        method:'POST'
    })
    localStorage.clear();
}

async function logOut() {
    await fetch('http://localhost:8080/api/logout',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        body: JSON.stringify({
            token: token
        })
    }).then(function (response) {
        response.json()
            .then(function (_data) {
                token = _data;
            })
    })
}

function onLoadWindow(){
    if (localStorage.getItem('token') == null){
        console.log("null");
        loginButton();
    }else
        logoutButton();
}
window.onload = getTariffList();
window.onload = getCourseList();
window.onload = onLoadWindow();


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


async function signUp(uName, uPass, uEmail, uSurname, uSkype) {
    let skype;
    var username;
    var password;
    let name;
    let surname;
    let user;
    if (uEmail === undefined || uPass === undefined|| uName === undefined || uSurname === undefined){
        alert("Please fill all in all fields, which marked with '*' !")
    }else {
        username = uEmail;
        password = uPass;
        name = uName;
        surname = uSurname;
    }
    if (skype !== ''){
        skype = uSkype;
    }
    let url = "/reg/student";

    //console.log(username + " " + birthDate)
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
            phoneNumber: null,
            skype: skype,
            birthDate: "1989-06-24",
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