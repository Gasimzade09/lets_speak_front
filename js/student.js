
document.getElementById("items-li").onclick = async function () {
    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
        let studentId = localStorage.getItem('studentId')
        await fetch(localStorage.getItem('baseurl')+'/student/get/'+localStorage.getItem('studentId'),{
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            }
        })
            .then(r => r.json())
            .then(json => {
                    student = json
                }
            );
        taskBody.innerHTML = "";
        taskBody.innerHTML+='<div class="col-lg-6 col-md-6">\n' +
            '                    <h5>Name: '+student.name+'</h5>\n' +
            '                    <h5>Surname: '+student.surname+'</h5>\n' +
            '                    <h5>Birth date: '+student.birthDate+'</h5>\n' +
            '                    <h5>Email: '+student.email+'</h5>\n' +
            '                    <h5>Skype: '+student.skype+'</h5>\n' +
            '                    <h5>Phone number: '+student.phoneNumber+'</h5>\n' +
            '                    <h5>Rank: '+student.rank+'</h5>\n' +
            '                    <img src="http://localhost:8080'+student.photo+'>' +
            '                    </div>\n' +
            '                    </div>\n' +
            '                    </div>';
    }
};