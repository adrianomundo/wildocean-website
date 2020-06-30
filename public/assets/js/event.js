"use strict";

$(document).ready( function() {

    fetchEvent();


});

async function fetchEvent() {

    let event_id = eventToDisplay();

    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id));
    console.log(event_response);
    if (!event_response.ok) {
        console.log("HTTPS API Error, status = " + event_response.status);
        location.replace("../pages/404.html");
    }
    let event = await event_response.json();
    if (event.length == 0) {
        location.replace("../pages/404.html");
    }

    let person_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id + "/person"));
    if (!person_response.ok) {
        console.log("HTTPS API Error, status = " + person_response.status);
        location.replace("../pages/404.html");
    }
    let person = await person_response.json();

    let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id + "/service"));
    if (!service_response.ok) {
        console.log("HTTPS API Error, status = " + service_response.status);
        location.replace("../pages/404.html");
    }
    let service = await service_response.json();

    let events_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
    console.log(events_response);
    if (!events_response.ok) {
        console.log("HTTPS API Error, status = " + events_response.status);
        location.replace("../pages/404.html");
    }
    let events = await events_response.json();
    let max_id = events.length;

    console.log(event);
    console.log(person);
    console.log(service);

    pageTitle(event[0]);

    let html = displayOrientation(event[0]);
    html += displayEvent(event[0]);
    html += displayNavigation(event[0]);

    let img_circle = personRounded(person[0].img);

    if (service.length > 0) {
        let service_response_new = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service[0].service_id));
        if (!service_response_new.ok) {
            console.log("HTTPS API Error, status = " + service_response_new.status);
            location.replace("../pages/404.html");
        }
        let service_new = await service_response_new.json();

        let img_circle_2 = serviceRounded(service_new[0].img[0]);
        html += displayEventAndService(person[0], img_circle, service_new[0], img_circle_2);
    }
    else {
        html += displayEventPeople(person[0], img_circle);
    }

    //html += displayNavigationItems(event[0]);

    $('#event').append(html)
    
    fixNavigationLink(event[0], max_id);
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
    return '<div class="row text-left" style="padding-bottom: 0">' +
    '<ol class="breadcrumb">' +
        '      <li class="breadcrumb-item">' +
        '        <a href="events.html" style="color: black">Events</a>' +
        '      </li>' +
        '      <li class="breadcrumb-item active" style="color: #0077C0">' + event.title + '</li>' +
        '    </ol>' +
        '</div>';
}

function displayEvent(event){
    return  '<div class="row justify-content-center" style="padding-bottom: 10px; padding-top: 10px">' +
                '<div class="col-lg-6">' +
                    '<img class="img-fluid rounded" alt="Event_img" src=' + event.img + '>' +
                '</div>' +
                '<div class="col-lg-6 text-left">'+
                    '<h2 style="margin-bottom: 25px; margin-left: 10px; margin-top: 10px">' + event.title +'</h2>' +
                    '<div class="date">' +
                        '<i class="fa fa-calendar" style="font-size: 20px;"></i>' +
                        '<p style="display: inline-block">' + correctDate(event.date) + '</p>' +
                    '</div>' +
                    '<div class="hour">' +
                        '<i class="fa fa-clock-o" style="font-size: 20px;"></i>' +
                        '<p style="display: inline-block">' + event.start_h + ' - ' + event.end_h+ '</p>' +
                    '</div>' +
                    '<div class="nation">' +
                        '<i class="fa fa-globe" style="font-size: 20px;"></i>' +
                        '<p style="display: inline-block">' + event.location + '</p>' +
                    '</div>'+
                    '<div class="phone">' +
                        '<i class="fa fa-mobile" style="font-size: 20px;"></i>' +
                        '<p style="display: inline-block">' + event.phone + '</p>' +
                    '</div>'+
                    '<div  class="fa fa-instagram" ></div>' +
                    '<div  class="fa fa-facebook"></div>' +
                    '<div  class="fa fa-twitter"></div>' +
                    '<div  class="fa fa-linkedin"></div>' +
                    '<div  class="fa fa-youtube"></div>' +
                '</div>' +
            '</div>';

}

function displayNavigation(event) {

    let html = "";

    let event_id = event.event_id;
    let next = event_id + 1;
    let prev = event_id - 1;

    html += '<div class=container style="text-align: left; justify-content: left;">' +
        '<div class="row justify-content-between" style="padding-top: 10px">' +
        '<div class="col-3">'+
        '<a href="event.html?id='+ prev +'" id="prev_link">' +
        '<div class="gt-button prevnext round" id="prev_button">' +
        '<i class="fa fa-arrow-left" style="font-size: 20px;"></i>' +
        '</div></a>' +
        '</div>' +
        '<div class="col-3 text-right">'+
        '<a href="event.html?id='+ next +'" id="next_link">' +
        '<div class="gt-button prevnext round" id="next_button">' +
        '<i class="fa fa-arrow-right" style="font-size: 20px; padding-left: 6px"></i>' +
        '</div></a>' +
        '</div>' +
        '<div class="col-6 text-right">' + '</div>' +
        '</div>' +
        '<p>' + event.long_description + '</p>' +
        '</div>';

    return html;

}

function fixNavigationLink(event, max_id) {

    let event_id = event.event_id;
    let prev = event_id - 1;

    if (prev == 0) {
        $("#prev_link").removeAttr("href");
        $("#prev_button").remove('prevnext').toggleClass('prevnext-disabled');


    }
    if (event_id == max_id) {
        $("#next_link").removeAttr("href");
        $("#next_button").remove('prevnext').toggleClass('prevnext-disabled');

    }
}

function displayEventAndService(person, img_circle, service, img_circle_2) {

    let space = "&nbsp";
    return '<div class="container" style="text-align: center">' +
        '<div class="row justify-content-center">' +
                '<div class="col-lg-4 mb-4">'+
                    '<h2 class="custom_heading align-center">Organiser</h2>' +
                    '<div class="card text-center" style="border-radius: 15px;">' +
                        '<img class="card-img-top" alt="person_img" src="'+ img_circle +'" height="250" style="padding-top: 20px">' +
                        '<div class="card-body">' +
                            '<h4 class="card-title">'+ person.name + ' '+ person.surname + '</h4>' +
                            '<p class="card-text">' + person.role + '</p>' +
                            '<a href="person.html?id='+ person.matricola +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>SEE MORE</b></span></a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-lg-4 mb-4">'+
                    '<h2 class="custom_heading align-center">Service</h2>' +
                    '<div class="card text-center" style="border-radius: 15px !important;>">' +
                        '<img class="card-img-top" alt="service_img" src="'+ img_circle_2 +'" height="250" style="padding-top: 20px">' +
                        '<div class="card-body">' +
                            '<h4 class="card-title">'+ service.title + '</h4>' +
                            '<p class="card-text">'+space+'</p>' +
                            '<a href="service.html?id='+ service.service_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
        '</div>' +
        '</div>';
}

function displayEventPeople(person, img_circle) {

    return '<div class="container" style="text-align: center">' +
        '<h2 class="custom_heading align-center" style="text-align: center">Organiser</h2>' +
            '<div class="row justify-content-center" style="margin-left: 0">' +
                '<div class="col-lg-4 mb-4">'+
                        '<div class="card h-100 text-center" style="border-radius: 15px">' +
                            '<img class="card-img-top" alt="person_img" src="'+img_circle+'" height="250" style="padding-top: 20px">' +
                                '<div class="card-body">' +
                                '<h4 class="card-title">'+ person.name + ' '+ person.surname + '</h4>' +
                                '<p class="card-text">' + person.role + '</p>' +
                                '<a href="person.html?id='+ person.matricola +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>SEE MORE</b></span></a>' +
                                '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
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


