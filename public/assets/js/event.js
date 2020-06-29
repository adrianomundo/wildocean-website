"use strict";

$(document).ready( function() {

    fetchEvent();


});

async function fetchEvent() {

    let event_id = eventToDisplay();

    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id));
    if (!event_response.ok) {
        console.log("HTTPS API Error, status = " + event_response.status);
        location.replace("../assets/pages/404.html");
    }
    let event = await event_response.json();

    let person_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id + "/person"));
    if (!person_response.ok) {
        console.log("HTTPS API Error, status = " + person_response.status);
        location.replace("../assets/pages/404.html");
    }
    let person = await person_response.json();

    let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id + "/service"));
    if (!service_response.ok) {
        console.log("HTTPS API Error, status = " + service_response.status);
        location.replace("../assets/pages/404.html");
    }
    let service = await service_response.json();

    console.log(event);
    console.log(person);
    console.log(service);

    pageTitle(event[0]);

    let html = displayOrientation(event[0]);
    html += displayEvent(event[0]);

    html += createRelationContainer();
    html += displayEventPeople(person[0]);

    if (service.length > 0) {
        let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/"+ service[0].service_id));
        if (!service_response.ok) {
            console.log("HTTPS API Error, status = " + service_response.status);
            location.replace("../assets/pages/404.html");
        }
        let service_new = await service_response.json();
        console.log(service);
        html += displayEventService(service_new[0]);
    }

    //html += displayNavigationItems(event[0]);

    $('#event').append(html)
}


// take the ID of the event to display
function eventToDisplay() {

    console.log("Getting event_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    return parseInt(searchParams.get("id"));

}

// set page title
function pageTitle(event) {
    $("#page_title").text("Wild Ocean | " + event.title);

}

// display orientation info with breadcrumbs
function displayOrientation(event) {
    return '<ol class="breadcrumb" >\n' +
        '      <li class="breadcrumb-item">\n' +
        '        <a href="events.html">Events</a>\n' +
        '      </li>\n' +
        '      <li class="breadcrumb-item active">' + event.title + '</li>\n' +
        '    </ol>';
}

function displayEvent(event){
    return   '<div class="row justify-content-center">' +
        '<div class="col-lg-6">' +
        '<img class="img-fluid rounded" alt="Event_img" src=' + event.img + '>' +
        '</div>' +
        '<div class="col-lg-6 text-left">'+
        '<h2 style="margin-bottom: 25px; margin-left: 10px; margin-top: 10px">' + event.title +'</h2>' +
        '<div class="date">' +'' +
        '<i class="fa fa-calendar" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">' + correctDate(event.date) + '</p>' +
        '</div>' +
        '<div class="hour">' +'' +
        '<i class="fa fa-clock-o" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">' + event.start_h + ' - ' + event.end_h+ '</p>' +
        '</div>' +
        '<div class="nation">' +
        '<i class="fa fa-globe" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">' + event.location + '</p>' +
        '</div>'+
        '<div class="phone">' +'' +
        '<i class="fa fa-mobile" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">' + event.phone + '</p>' +
        '</div>'+
        '<div  class="fa fa-instagram" ></div>\n' +
       '<div  class="fa fa-facebook"></div>\n' +
        '<div  class="fa fa-twitter"></div>\n' +
        '<div  class="fa fa-linkedin"></div>\n' +
        '<div  class="fa fa-youtube"></div>\n' +
        '</div>' +
        '<div class=container style="margin-top: 30px; text-align: left; justify-content: left">' +
        '<p>' + event.long_description + '</p>' +
        '</div>';
}

function createRelationContainer() {
    return `<div class="container" id="relation_container" style="text-align: center">
    <div class="row justify-content-center" id="relation_row">`;
}


function displayEventPeople(person) {
    return '<div class="col-lg-4 mb-4">'+
        '<h2 class="custom_heading align-center">Organiser</h2>' +
        '<div class="card h-100 text-center" style="border-radius: 15px>"> ' +
        '<img class="card-img-top" alt="person_img" src='+ personRounded(person.img) + ' '+ 'height="250" style="padding-top: 20px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ person.name + ' '+ person.surname + '</h4>' +
        '<p class="card-text">' + person.role + '</p>' +
        '<a href="person.html?id='+ person.matricola +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>SEE MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>'

}

function displayEventService(service) {
    return '<div class="col-lg-4 mb-4">'+
        '<h2 class="custom_heading align-center">Service</h2>' +
        '<div class="card h-100 text-center" style="border-radius: 15px>"> ' +
        '<img class="card-img-top" alt="Missing" src='+ serviceRounded(service.img[0]) + ' '+ 'height="250" style="padding-top: 20px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ service.title  + '</h4>' +
        '<a href="service.html?id='+ service.service_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function displayNavigationItems(event) {

    return '<div class="row">\n' +
    '        <div class="col-lg-6">\n' +
    '          <ul class="pager">\n' +
    '            <li class="previous text-left"><a href="event.html?id='+ (event.event_id -1) +'">Previous</a></li>\n' +
    '          </ul>\n' +
    '        </div>\n' +
    '        <div class="col-lg-6">\n' +
    '          <ul class="pager">\n' +
    '            <li class="next text-right"><a href="event.html?id='+ (event.event_id +1) +'">Next</a></li>\n' +
    '          </ul>\n' +
    '        </div>\n' +
    '      </div>';
}

// utils
function personRounded(img) {
    let img_circle = img.substr(0, 28);
    img_circle += '_rounded.svg'
    return img_circle
}

function serviceRounded(img) {
    let img_circle = img.substr(0, img.length-4);
    img_circle += '_rounded.svg'
    return img_circle
}

function correctDate(date) {
    return date.substr(0, 10);
}


