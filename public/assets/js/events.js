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
                //console.log(img);
                html += create(img, t, di, st, e, l)
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

function create(img, t, d, st, e, l) {
    return '<div class="col-lg-4 mb-4">'+
        '<div class="card h-100 text-center" style="border-radius: 30px>"> ' +
        '<img class="card-img-top" alt="Missing" src='+ img + ' '+ '>' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ t + '</h4>' +
        '<p class="card-text">' + d + '</p>' +
        '<p class="card-text">' + st + ' - ' + e + '</p>' +
        '<p class="card-text">' + l + '</p>' +
        '<button type="button" class="btn btn-link" >FIND OUT MORE</button>' +
        '</div>' +
        '</div>' +
        '</div>'

}