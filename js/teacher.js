let obj = [];
let student;
async function getDates() {
    token = localStorage.getItem('token')
    await fetch(localStorage.getItem('baseurl')+'/get/schedules/'+localStorage.getItem('studentId'),{
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
        obj.push({"date":data.date + " " + data.time, "title":"Event 1", "description":"desc", "url":""})
    }
}

$(function () {
    $('#eventCalendar').eventCalendar({
        jsonData: obj,
        jsonDateFormat: 'human',
        dateFormat: 'YYYY-MM-DD dddd'
    });

})

window.onload = getDates();