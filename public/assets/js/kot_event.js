"use strict";

$(document).ready( function() {

    fetchEvent();


});

async function fetchEvent() {
    let event_id = eventToDisplay();

    let response = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id));
    let event = await response.json();

    let response1 = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id + "/person"));
    let person = await response1.json();

    let response2 = (await fetch("https://wildocean.herokuapp.com/api/v1/events/" + event_id + "/service"));
    let service = await response2.json();

    //console.log(events);
    console.log(event);
    console.log(person);
    console.log(service);

    let html = '<ol class="breadcrumb" >\n' +
        '      <li class="breadcrumb-item">\n' +
        '        <a href="events.html">Events</a>\n' +
        '      </li>\n' +
        '      <li class="breadcrumb-item active">' + event[0].title + '</li>\n' +
        '    </ol>'

    html += createEvent(event[0]);
    html += createPerson(person[0]);
    if (service.length >0) {
        let service_id = service[0].service_id;
        let response4 = (await fetch("https://wildocean.herokuapp.com/api/v1/services/"+ service_id));
        let serv = await response4.json();
        console.log(serv);
        html += createService(serv[0]);
    }

    html += '<div class="row">\n' +
        '        <div class="col-lg-6">\n' +
        '          <ul class="pager">\n' +
        '            <li class="previous text-left"><a href="kot_event.html?id='+ (event_id -1) +'">Previous</a></li>\n' +
        '          </ul>\n' +
        '        </div>\n' +
        '        <div class="col-lg-6">\n' +
        '          <ul class="pager">\n' +
        '            <li class="next text-right"><a href="kot_event.html?id='+ (event_id +1) +'">Next</a></li>\n' +
        '          </ul>\n' +
        '        </div>\n' +
        '      </div>'

    $('#event').append(html)
}


function createPerson(person) {
    return '<div class="col-lg-4 mb-4">'+
        '<h2><u>Organiser</u></h2>' +
        '<div class="card h-100 text-center" style="border-radius: 30px>"> ' +
        '<img class="card-img-top" alt="Missing" src='+ personRounded(person.img) + ' '+ 'height="250" style="padding-top: 20px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ person.name + ' '+ person.surname + '</h4>' +
        '<p class="card-text">' + person.role + '</p>' +
        '<a href="person.html?id='+ person.matricola +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>SEE MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>'

}

function createService(service) {
    return '<div class="col-lg-4 mb-4">'+
        '<h2><u>Service</u></h2>' +
        '<div class="card h-100 text-center" style="border-radius: 30px>"> ' +
        '<img class="card-img-top" alt="Missing" src='+ serviceRounded(service.img[0]) + ' '+ 'height="250" style="padding-top: 20px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ service.title  + '</h4>' +
        '<a href="service.html?id='+ service.service_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>'

}

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

function createEvent(event){
      return    '<div class="row">' +
                '<div class="col-lg-6">' +
                '<img class="img-fluid rounded" alt="Missing" src=' + event.img + '>' +
                '</div>' +
                '<div class="col-lg-6 text-center">'+
                '<h2>' + event.title +'</h2>' +
                '<p>' + correctDate(event.date) + '</p>' +
                '<p>' + event.start_h + ' - ' + event.end_h + ' </p>' +
                '<p>' + event.location + '</p>' +
                '<p>' + event.phone +' </p>' +
                '</div>' +
                '<p>' + event.long_description + '</p>'
}

function eventToDisplay() {

    console.log("Getting event_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    return parseInt(searchParams.get("id"));


}

function correctDate(date) {
    return date.substr(0, 10);

}


