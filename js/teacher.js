let obj = [];
let student;
let taskBody = document.getElementById("eventCalendar");
let Login = document.getElementById("login");
async function getDates() {
    //getTeacherId();
    let teacherId = localStorage.getItem('privateId');
    token = localStorage.getItem('token');
    let datas;
    await fetch(localStorage.getItem('baseurl')+'/get/teacher/schedules/'+teacherId,{
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    })
        .then(r => r.json())
        .then(json => {
                datas = json
            });
    for(let data of datas){
        obj.push({"date":data.date + " " + data.time, "title":data.studentName, "description":"desc", "url":""})
    }
    console.log(obj);
}

$(function () {
    $('#eventCalendar').eventCalendar({
        jsonData: obj,
        jsonDateFormat: 'human',
        dateFormat: 'YYYY-MM-DD dddd'
    });

})


async function profile() {
    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
        let studentId = localStorage.getItem('studentId')
        await fetch(localStorage.getItem('baseurl')+'/teacher/get/'+localStorage.getItem('privateId'),{
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': localStorage.getItem('token')
            }
        })
            .then(r => r.json())
            .then(json => {
                    teacher = json
                }
            );
        let photo = "/lets_speak-front/img/nobody_m.original.jpg";
        if(teacher.photo !== undefined){
            photo = "http://locahost:8080"+teacher.photo;
        }
        taskBody.innerHTML = "";
        document.getElementById("profile").innerHTML = "";
        document.getElementById("profile").innerHTML+='<div class="row">' +
            '<div class="col-md-7">'+
            '<div class="panel panel-default">'+
            '<div class="panel-body">'+
            '<div class="box box-info">'+
            '<div class="box-body">'+
            '<div class="col-sm-5">'+
            '<div  align="center"> <img alt="User Pic" src="'+photo+'" id="profile-image1" class="img-circle img-responsive">' +
            '<input id="profile-image-upload" class="hidden" type="file">' +
            '<div style="color:#999;" >click here to change profile image</div>'+
            '</div>'+
            '<br>'+
            '</div>'+
            '<div class="col-sm-6">'+
            '<span><h4 style="color:#00b1b1;">'+teacher.name +' '+ teacher.surname +'</h4></span>'+
            '<span><p>Teacher</p></span>'+
            '</div>\n'+
            '<div class="clearfix"></div>'+
            '<hr style="margin:5px 0 5px 0;">'+

            '<div class="col-sm-5 col-xs-6 tital">First Name:</div>' +
            '<div class="col-sm-7 col-xs-6 ">'+teacher.name+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Last Name:</div>' +
            '<div class="col-sm-7">'+teacher.surname+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Date Of Birth:</div>' +
            '<div class="col-sm-7">'+teacher.birthDate+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Phone number:</div>' +
            '<div class="col-sm-7">'+teacher.phoneNumber+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Email:</div>' +
            '<div class="col-sm-9">'+teacher.email+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Skype:</div>' +
            '<div class="col-sm-8">'+teacher.skype+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Password:</div>' +
            '<div class="col-sm-12"><input type="button" class="btn btn-danger btn-sm" onclick="changePassword()" value="Change password"> </div>'+
            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
    }
};
$(function() {
    $('#profile-image1').on('click', function() {
        $('#profile-image-upload').click();
    });
});

async function changePassword() {
    var cPassword;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="input-group">\n' +
        '  <div class="input-group-prepend">\n' +
        '    <span class="input-group-text">Password</span>\n' +
        '  </div>\n' +
        '  <input type="password" id="cPass" aria-label="password" class="form-control">\n' +
        '</div>';
    swal({
        title: "Are you sure?",
        text: "Your password will be changed and you must do relogin",
        content: wrapper,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            cPassword = document.getElementById("cPass").value;
            if (willDelete) {
                swal("Your password was successfully changed", {
                    icon: "success",
                }).then(function () {
                    //console.log(document.getElementById("cPass").value);
                    fetch(localStorage.getItem('baseurl')+"/reset/pass",{
                        method: "PUT",
                        headers:{
                            'Content-Type': 'application/json',
                            'X-Auth-Token': localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            email: localStorage.getItem('username'),
                            password: cPassword,
                            birthDate: null
                        })
                    })
                }).then(deleteToken)
                    .then(onLoadFunctions)
            } else {
                swal("Your password wasn't changed!");
            }
        })
}

function setRank(id){
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="row">' +
        '<div class="input-group-prepend col-sm-4">\n' +
        '<label class="input-group-text" for="inputGroupSelect01">Options</label>\n' +
        '</div>\n' +
        '<select class="custom-select col-sm-6" id="rank">\n' +
        '<option selected value="5.0">Set 5.0</option>\n' +
        '<option value="10.0">Set 10.0</option>\n' +
        '<option value="15.0">Set 15.0</option>\n' +
        '</select>\n' +
        '</div>';

    swal({
        title: 'Set rank for student',
        text: 'Choose rank from select',
        content: wrapper,
        button: 'SET',

    }).then(function () {
        fetch(localStorage.getItem('baseurl')+'/set/student/rank/'+id+'/'+document.getElementById("rank").value,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-Auth-Token': localStorage.getItem('token')
            }
        }).then(getStudentList);
    })
}



async function getStudentList() {
    //getTeacherId();
    teacherId = localStorage.getItem('privateId')
    let studentArray = [];
    //token = localStorage.getItem('token');
    //localStorage.setItem('baseurl', baseUrl)
    console.log(localStorage.getItem('baseurl'));
    console.log("get post " + token);
    await fetch(localStorage.getItem('baseurl')+'/teacher/get/students/'+teacherId,{
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    })
        .then(r => r.json())
        .then(json => {
            studentArray = json
            }
        );
    taskBody.innerHTML = "";
    document.getElementById("profile").innerHTML = "";
    //document.getElementById("task_body").innerHTML = "";
    let innerHtml =
        '<table class="table table-hover">' +
        '<thead>' +
        '<tr>'+
        '<th colspan="7"><p class="black list-title" align="center">Student List</p></th>' +
        '</tr>'+
        '<tr>' +
        '<th scope="col">#</th>\n' +
        '<th scope="col">First name</th>\n' +
        '<th scope="col">Last name</th>\n' +
        '<th scope="col">Skype</th>\n' +
        '<th scope="col">Email</th>\n' +
        '<th scope="col">Rank</th>\n' +
        '<th scope="col">Set rank</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody>\n' +
        '<tr>\n';
    let i = 1;
    for (let student of studentArray) {
        innerHtml += '<th scope="row">'+i+'</th>\n'+
            '<td>'+student.name+'</td>\n'+
            '<td>'+student.surname+'</td>\n'+
            '<td>'+student.skype+'</td>\n'+
            '<td>'+student.email+'</td>\n'+
            '<td>'+student.rank+'</td>\n'+
            '<td><button onclick="setRank('+student.id+')" class="btn btn-primary" type="button" value="Buy">Set rank</button></td>\n'+
            '</tr>\n';
        i++;
    }
    console.log("out of for each");
    innerHtml +=
        '</tbody>'+
        '</table>';
    document.getElementById("students").innerHTML = innerHtml;

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
    if (localStorage.getItem('token') === null || localStorage.getItem('userRole') !== 'ROLE_TEACHER'){
        window.location.href = "http://localhost:63342/lets_speak-front/index.html";
    }
}
window.onload = onLoadFunctions();

window.onload = getDates();

window.onload = logoutButton();

