let obj = [];
let student;
let teacherId;
async function getDates() {
    getTeacherId();
    token = localStorage.getItem('token')
    await fetch(localStorage.getItem('baseurl')+'/get/teacher/schedules/'+localStorage.getItem('teacherId'),{
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    })
        .then(r => r.json())
        .then(json => {
                datas = json
            }
        );
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



async function getTeacherId() {
    token = localStorage.getItem('token')
    username = localStorage.getItem('username')
    console.log(username)
    var newUser = username.split('@').join('%40');
    console.log(newUser)
    baseUrl = await localStorage.getItem('baseurl')
    fetch(baseUrl + "/teacher/get/id?email="+newUser, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(function (response) {
        response.json()
            .then(function (data) {
                teacherId = data
                localStorage.setItem('teacherId', teacherId)
            })
        console.log(teacherId)


    })
    console.log(localStorage.getItem('teacherId'))
}

async function setStudentTask(){

}

async function getStudenList() {
    getTeacherId();
    let studentArray = {};
    //token = localStorage.getItem('token');
    //localStorage.setItem('baseurl', baseUrl)
    console.log(localStorage.getItem('baseurl'))
    console.log("get post " + token)
    await fetch(baseUrl+'/teacher/get/students/'+localStorage.getItem('teacherId'),{
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    })
        .then(r => r.json())
        .then(json => {
            studentArray = json
            }
        );
    taskBody.innerHTML = '';
    let innerHtml = ''+
        '<table class="table table-hover">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">#</th>\n' +
                    '<th scope="col">First</th>\n' +
                    '<th scope="col">Last</th>\n' +
                    '<th scope="col">Rank</th>\n' +
                '</tr>\n' +
            '</thead>\n' +
            '<tbody>\n' +
                '<tr>\n';
    let i = 1;
    for (let student of studentArray) {

        innerHtml += '<th scope="row">'+i+'</th>\n'+
            '<td>'+student.name+'</td>\n'+
            '<td>'+student.surname+'</td>\n'+
            '<td>'+student.rank+'</td>\n'+
            '</tr>\n'
        i++;
    }
    console.log("out of for each")
    innerHtml +=
        '</tbody>'+
        '</table>';
    taskBody.innerHTML = innerHtml;

};


function onLoadFunctions(){
    if (token != null)
        window.onload = getTeacherId();

}

window.onload = getDates();

window.onload = onLoadFunctions();