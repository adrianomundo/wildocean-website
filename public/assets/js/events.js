"use strict";

$(document).ready( function() {

    getEvents();


});

async function getEvents() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/events").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {
            let html = '<div class="row"> '
            for (let s of json) {
                let t = s.title
                let d = s.date
                let di = d.substr(0, 10)
                let img = s.img
                let st = s.start_h
                let e = s.end_h
                let l = s.location
                let event_id = s.event_id
                //console.log(img);
                html += create(img, t, di, st, e, l, event_id)
                //console.log(img_circle);

            }
            html += '</div>'
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
    return '<div class="col-lg-4 mb-4">'+
        '<div class="card h-100 text-center" style="border-radius: 30px>"> ' +
        '<img class="card-img-top" alt="Missing" src='+ img + ' '+ '>' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ t + '</h4>' +
        '<p class="card-text">' + d + '</p>' +
        '<p class="card-text">' + st + ' - ' + e + '</p>' +
        '<p class="card-text">' + l + '</p>' +
        '<a href="kot_event.html?id=' + event_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>'

}