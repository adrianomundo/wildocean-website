"use strict";

$(document).ready( function() {

    getEvents();
    //getMonth()

});

async function getEvents() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/events").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {
            //let html = '<div class="row" id="event"> '
            let html = ''
            for (let s of json) {
                let t = s.title
                let d = s.date
                let di = d.substr(0, 10)
                let img = s.img
                let st = s.start_h
                let e = s.end_h
                let l = s.location
                let event_id = s.event_id
                html += create(img, t, di, st, e, l, event_id)
                //console.log(img_circle);

            }
            //html += '</div>'
            $('#all-events').append(html)
            //console.log(json);
        });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}

function create(img, t, d, st, e, l, event_id) {
    return '<div class="col-lg-4 mb-4" id="event">'+
        '<div class="card h-100 text-center" style="border-radius: 30px>"> ' +
        '<img class="card-img-top" alt="Missing" src='+ img + ' '+ '>' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ t + '</h4>' +
        '<p class="card-text">' + d + '</p>' +
        '<p class="card-text">' + st + ' - ' + e + '</p>' +
        '<p class="card-text">' + l + '</p>' +
        '<a href="event.html?id=' + event_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>'

}



function checkMonth(event, number) {
    let month = event.date.substr(5,7);
    let month1 = month.substr(0,2);
    parseInt(month1);
    console.log(month1)
    console.log(number)
    if (month1 === number || number === "00" ) return 1;
    else return 0;
}

function correctDate(date) {
    return date.substr(0, 10);

}

 function getMonth(number) {
    let month = number;
    console.log(number)
    appendEvents(month)
}


 async  function appendEvents(number) {
     let month = number;
     let response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
     let events = await response.json();
    console.log(events);
     let row = document.getElementById("all-events");
     let number_of_columns = row.childElementCount;
     //console.log("Ehi"+ number_of_columns)
     if (number_of_columns)
         for (let i = 0; i < number_of_columns; i++) {
            row.children[i].remove()
         }


     //let html = '<div class="row" id="event"> '
     let html = ''
     for (let s in events) {
         let response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
         let events = await response.json();
         console.log(events[s]);

        if (checkMonth(events[s], month) === 1 ) html += createCard(events[s])
     }

     //html += '</div>'
     $('#all-events').append(html)
}

function createCard(event) {
    return '<div class="col-lg-4 mb-4" id="event">'+
        '<div class="card h-100 text-center" style="border-radius: 15px>"> ' +
        '<img class="card-img-top" style="border-radius: 15px" alt="Missing" src='+ event.img + ' '+ '>' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ event.title + '</h4>' +
        '<p class="card-text">' + correctDate(event.date) + '</p>' +
        '<p class="card-text">' + event.start_h + ' - ' + event.end_h + '</p>' +
        '<p class="card-text">' + event.location + '</p>' +
        '<a href="event.html?id=' + event.event_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>'
}