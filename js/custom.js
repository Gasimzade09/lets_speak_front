let taskBody = document.getElementById("eventCalendar");
var studentId;
async function getStudentId() {
    token = localStorage.getItem('token')
    console.log(token)
    username = localStorage.getItem('username')
	//var newUser = username.split('@').join('%40');
    console.log(username)
    baseUrl = await localStorage.getItem('baseurl')
    await fetch(baseUrl + "/get/id?email="+username, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(function (response) {
        response.json()
            .then(function (data) {
                studentId = data
                localStorage.setItem('studentId', studentId)
                localStorage.getItem('studentId')
            })
        localStorage.setItem('studentId', studentId)
        console.log("student id: " + localStorage.getItem('studentId'))

    })
    console.log("studentId: " + studentId)
    console.log("localStorage: " + localStorage.getItem('studentId'))

}

async function getTasks(){
    if(localStorage.getItem('token')!==undefined){
        let tasks =[];
        studentId = localStorage.getItem('studentId')
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
        taskBody.innerHTML +=  '<div class="col-lg-4 col-md-6">\n' +
                        '<div class="categorie-item">\n' +
                        '<div class="ci-thumb set-bg" data-setbg="img/categories/1.jpg"></div>';

        for(let task of tasks){
            taskBody.innerHTML += '<div class="ci-text">\n'+
                                 '<h5>'+task.name+'</h5>\n' +
                                 '<a>'+task.url+'</a>\n' +
                                 '</div>';
            console.log(task.name)
        }
        taskBody.innerHTML += '</div>\n' +
                    '</div>';

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

