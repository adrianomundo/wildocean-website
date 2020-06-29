"use strict";

$(document).ready( function() {

    fetchEvents();

});

async function fetchEvents() {

    let events_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
    if (!events_response.ok) {
        console.log("HTTPS API Error, status = " + events_response.status);
        location.replace("../assets/pages/404.html");
    }
    let events = await events_response.json();

    let html = "";
    for(let i = 0; i < events.length; i++) {
        html += displayEvent(events[i]);
    }
    $('#all-events').append(html)

}

function displayEvent(event) {
    return '<div class="col-lg-4 mb-4" >'+
        '<div class="card h-100 text-center" style="border-radius: 15px !important;>"> ' +
        '<img class="card-img-top" alt="Missing" src="'+ event.img +'" style="border-top-left-radius: 15px; border-top-right-radius: 15px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ event.title + '</h4>' +
        '<div class="date_event">' +
            '<i class="fa fa-calendar" style="font-size: 20px;"></i>' +
            '<p style="display: inline-block">' + event.date.substr(0, 10) + '</p>' +
        '</div>'+
        '<div class="hour_event">' +
            '<i class="fa fa-clock-o" style="font-size: 20px;"></i>' +
            '<p style="display: inline-block">'+ event.start_h + ' - ' + event.end_h +  '</p>' +
        '</div>'+
        '<div class="loc_event">' +
            '<i class="fa fa-globe" style="font-size: 20px;"></i>' +
            '<p style="display: inline-block">'+ event.location + '</p>' +
        '</div>'+
        '<a href="event.html?id=' + event.event_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px; font-weight: 600;">FIND OUT MORE</span></a>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function getMonth(number) {
    let month = number;
    console.log(number);
    appendEvents(month);
}

async function appendEvents(number) {

    let month = number;
    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
    if (!event_response.ok) {
        console.log("HTTPS API Error, status = " + event_response.status);
        location.replace("../pages/404.html");
    }
    let events = await event_response.json();

    console.log(events);

    let events_to_remove = document.getElementById("all-events");
    let number_to_remove = events_to_remove.childElementCount;
    if (number_to_remove) {
        for (let i = 0; i < number_to_remove; i++) {
            events_to_remove.children[0].remove();
        }
    }

    let html = "";
    for (let i = 0; i < events.length; i++) {
        if (checkMonth(events[i], month) === 1 ) {
            html += displayEvent(events[i])
        }
    }
    $('#all-events').append(html)
}

function checkMonth(event, number) {
    let month = event.date.substr(5,7);
    let month1 = month.substr(0,2);
    parseInt(month1);
    console.log(month1);
    console.log(number);
    if (month1 === number || number === "00" ) return 1;
    else return 0;
}
