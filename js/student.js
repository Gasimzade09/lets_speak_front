
document.getElementById("items-li").onclick = async function () {
    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
        let studentId = localStorage.getItem('studentId')
        await fetch(localStorage.getItem('baseurl')+'/student/get/'+localStorage.getItem('studentId'),{
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': localStorage.getItem('token')
            }
        })
            .then(r => r.json())
            .then(json => {
                    student = json
                }
            );
        let photo = "/lets_speak-front/img/nobody_m.original.jpg";
        if(student.photo !== null){
            photo = "http://locahost:8080"+student.photo;
        }
        taskBody.innerHTML = "";
        document.getElementById("profile").innerHTML = "";
        document.getElementById("task_body").innerHTML = "";
        document.getElementById("orders").innerHTML = "";
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
            '<span><h4 style="color:#00b1b1;">'+student.name +' '+ student.surname +'</h4></span>'+
            '<span><p>Student</p></span>'+
            '</div>\n'+
            '<div class="clearfix"></div>'+
            '<hr style="margin:5px 0 5px 0;">'+

            '<div class="col-sm-5 col-xs-6 tital">First Name:</div>' +
            '<div class="col-sm-7 col-xs-6 ">'+student.name+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Last Name:</div>' +
            '<div class="col-sm-7">'+student.surname+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Rank:</div>' +
            '<div class="col-sm-7">'+student.rank+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Date Of Birth:</div>' +
            '<div class="col-sm-7">'+student.birthDate+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Phone number:</div>' +
            '<div class="col-sm-7">'+student.phoneNumber+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Email:</div>' +
            '<div class="col-sm-7">'+student.email+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Skype:</div>' +
            '<div class="col-sm-8">'+student.skype+'</div>'+

            '<div class="clearfix"></div>'+
            '<div class="bot-border"></div>'+

            '<div class="col-sm-5 col-xs-6 tital">Teacher:</div>' +
            '<div class="col-sm-7">'+student.teacherName+'</div>'+

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

