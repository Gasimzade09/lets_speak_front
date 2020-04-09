let taskBody = document.getElementById("eventCalendar");
var studentId;
let Login = document.getElementById("login");
let obj = [];
async function getStudentId() {
    token = localStorage.getItem('token');
    console.log(token);
    username = localStorage.getItem('username');
	//var newUser = username.split('@').join('%40');
    console.log(username);
    baseUrl =  localStorage.getItem('baseurl');
    await fetch(baseUrl + "/get/id?email="+username, {
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(async function (response) {
        response.json()
            .then(async function (data) {
                studentId = data;
                await localStorage.setItem('studentId', studentId);
                console.log("student_Id: " + studentId);
                localStorage.getItem('studentId')
            });
        localStorage.setItem('studentId', studentId);

        console.log("student id: " + localStorage.getItem('studentId'));

    });
    localStorage.setItem('studentId', studentId);
    console.log("studentId: " + studentId);
    console.log("localStorage: " + localStorage.getItem('studentId'));
}

var desc;
var count;
var input;
async function getPriceList(){
    let priceLists = [];
    await fetch(localStorage.getItem('baseurl') + "/get/tariffs",{
        headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    })
        .then(r=>r.json())
        .then(json => {
            priceLists = json
        })
    taskBody.innerHTML = "";
    document.getElementById("profile").innerHTML = "";
    document.getElementById("task_body").innerHTML = "";
    document.getElementById("orders").innerHTML = "";
    let ordersHtml = '<table class="table table-hover table-dark">' +
        '<thead>' +
        '<tr>'+
        '<th colspan="8"><p class="list-title" align="center">Tariff List</p></th>' +
        '</tr>'+
        '<tr>' +
        '<th scope="col">#</th>\n' +
        '<th scope="col">Tariff name</th>\n' +
        '<th scope="col">Count type</th>\n' +
        '<th scope="col">Lesson duration</th>\n' +
        '<th scope="col">Times a week</th>\n' +
        '<th scope="col">Total number of lessons</th>\n' +
        '<th scope="col">Total price</th>\n' +
        '<th scope="col">Buy course</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody>\n';
    var i = 1;
    for (let priceList of priceLists){
        var foundPos = priceList.name.indexOf(" ", 0);
        desc = priceList.name.substr(0, (foundPos+1)).toLowerCase() + '' + priceList.price;
        id = priceList.price + '' + priceList.name.substr(0, (foundPos+1)).toLowerCase();
        id = id.replace(/\s+/g, '');
        count = priceList.count;
        desc = desc.replace(/\s+/g, '');
        ordersHtml +=
            '<tr>\n'+
            '<th scope="row">'+i+'</th>\n'+
            '<td>'+priceList.name+'</td>\n'+
            '<td>'+priceList.countType+'</td>\n'+
            '<td>'+priceList.duration+' minutes</td>\n'+
            '<td>'+priceList.timesAWeek+'</td>\n'+
            '<td>'+priceList.count+' days</td>\n'+
            '<td>'+priceList.price+' AZN</td>\n'+
            '<td><button onclick="buy('+priceList.timesAWeek+','+priceList.id+')" class="btn btn-primary" data-toggle="modal" data-target="#modalLoginForm" type="button" value="Buy">Buy</button></td>\n'+
            '</tr>';

        input = document.getElementById(desc);
        i++;
    }
    ordersHtml +=
    '</tbody>'+
        '</table>';
    document.getElementById("orders").innerHTML = ordersHtml;
}


function buy(timesAWeek, tariffId){
    let inputs = '<div class="modal-content">\n' +
        '<div class="modal-header text-center">\n' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '<span aria-hidden="true">&times;</span>\n' +
        '</button>\n' +
        '</div>\n' +
        '<div class="modal-body mx-3">\n' +
        '<div class="md-form mb-5">\n' +
        '<div class="input-group mb-12">';
    document.getElementById("buyTariffInputs").innerHTML = "";
    for (let i = 0; i < timesAWeek; i++) {
        inputs += '<div class="row">' +
            '<div class="input-group-prepend col-sm-4">\n' +
            '<label class="input-group-text" for="inputGroupSelect01">Options</label>\n' +
            '</div>\n' +
            '<select class="custom-select col-sm-6" id="inputGroupSelect'+i+'">\n' +
            '<option selected>Choose week day...</option>\n' +
            '<option value="1">Monday</option>\n' +
            '<option value="2">Tuesday</option>\n' +
            '<option value="3">Wednesday</option>\n' +
            '<option value="4">Thursday</option>\n' +
            '<option value="5">Friday</option>\n' +
            '<option value="6">Saturday</option>\n' +
            '<option value="7">Sunday</option>\n' +
            '</select>\n' +
            '<div class="input-group-prepend col-sm-2">\n' +
            '<input type="time" id="time'+i+'">\n' +
            '</div>' +
            '</div>';
    }
    inputs += '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="modal-footer d-flex justify-content-center">\n' +
        '<button class="btn btn-default" onclick="setOrder('+tariffId+')">buy</button>\n' +
        '</div>\n' +
        '</div>';
    document.getElementById("buyTariffInputs").innerHTML += inputs;
}

async function setOrder(tariffId){
    let freeDays = [];
    let freeTimes = [];
    for (let j = 0; j < 7; j++) {
        if (document.getElementById("inputGroupSelect" + j) !== null){
            freeDays.push(document.getElementById("inputGroupSelect"+j).value);
            freeTimes.push(document.getElementById("time"+j).value);
        }

    }
    await fetch(localStorage.getItem('baseurl')+"/set/order/"+tariffId,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            freeDays: freeDays,
            freeTimes: freeTimes,
            id: localStorage.getItem('studentId')
        })
    });
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

async function onLoadFunctions(){
    if (localStorage.getItem('token') === null || localStorage.getItem('userRole') !== 'ROLE_STUDENT'){
        window.location.href = "http://localhost:63342/lets_speak-front/index.html";
    }
}
window.onload = onLoadFunctions();


window.onload = getStudentId();
window.onload = getStudentId();
window.onload = logoutButton();
async function getDates() {
    let studentId = localStorage.getItem('privateId');
    token = localStorage.getItem('token');
    let datas
    await fetch(localStorage.getItem('baseurl')+'/get/schedules/'+studentId,{
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    })
        .then(r => r.json())
        .then(json => {
            datas = json;
        });
    for(var data of datas){
        obj.push({"date":data.date + " " + data.time, "title":data.teacherName, "description":"desc", "url":""})
    }
    console.log(data.date);
}

$(function () {
    $('#eventCalendar').eventCalendar({
        jsonData: obj,
        jsonDateFormat: 'human',
        dateFormat: 'YYYY-MM-DD dddd'
    });

});


window.onload = getDates();



async function getOrders(){
    let orders = [];
    studentId = localStorage.getItem('studentId');
    await fetch(localStorage.getItem('baseurl') + "/get/orders/student/"+localStorage.getItem('privateId'),{
        headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    })
        .then(r=>r.json())
        .then(json => {
            orders = json
        })
    taskBody.innerHTML = "";
    document.getElementById("profile").innerHTML = "";
    document.getElementById("task_body").innerHTML = "";
    let ordersHtml = '<table class="table table-hover table-dark">' +
        '<thead>' +
        '<tr>'+
        '<th colspan="5"><p class="list-title" align="center">Order List</p></th>' +
        '</tr>'+
        '<tr>' +
        '<th scope="col">#</th>\n' +
        '<th scope="col">Order name</th>\n' +
<<<<<<< HEAD
        '<th scope="col">tariff name</th>\n' +
        '<th scope="col">teacher name</th>\n' +
=======
        '<th scope="col">Tariff name</th>\n' +
        '<th scope="col">Teacher name</th>\n' +
>>>>>>> 1d130f1bff04b54d264cd6f5378ca585ec7383a3
        '<th scope="col">Price</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody>\n' +
        '<tr>\n';
    let i = 1;
    for (let order of orders){
        ordersHtml += '<th scope="row">'+i+'</th>\n'+
            '<td>'+order.courseName+'</td>\n'+
            '<td>'+order.tariffName+'</td>\n'+
            '<td>'+order.teacherName+'</td>\n'+
            '<td>'+order.price+' AZN</td>\n'+
<<<<<<< HEAD
            '</tr>\n'
=======
            '</tr>\n';
>>>>>>> 1d130f1bff04b54d264cd6f5378ca585ec7383a3
        i++;
    }
    ordersHtml += '</tbody>'+
        '</table>';
    document.getElementById("orders").innerHTML = ordersHtml;
}

async function getTasks(){
    if(localStorage.getItem('token')!==undefined){
        let tasks =[];
        studentId = localStorage.getItem('studentId');
        console.log(studentId)
        await fetch(localStorage.getItem('baseurl') + '/tasks/get/'+localStorage.getItem('studentId'),{
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
        document.getElementById("profile").innerHTML = "";
        document.getElementById("task_body").innerHTML = "";
        document.getElementById("orders").innerHTML = "";
        let taskHtml = '<div class="row">';
        for(let task of tasks){
            taskHtml += '<div class="col-lg-4 col-md-6">\n'+
                        '<div class="categorie-item">\n'+
                        '<div class="ci-thumb set-bg" data-setbg="img/categories/1.jpg"></div>\n'+
                        '<div class="ci-text">\n'+
                        '<h5>'+task.name+'</h5>\n'+
                        '<a href="http://localhost:8080'+task.url+'">'+task.url+'</a>\n'+
                        '</div>\n'+
                        '</div>\n'+
                        '</div>';
            console.log(task.name)
        }
        document.getElementById("task_body").innerHTML +=taskHtml + '</div>';

    }

}

$(document).ready(function() {
    $("#upload-file-input").on("change", uploadFile);
});

/**
 * Upload the file sending it via Ajax at the Spring Boot server.
 */
async function uploadFile() {

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

