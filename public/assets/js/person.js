"use strict";

$(document).ready( function() {

    get();


});

async function get() {
    let matricola = matricolaToDisplay();

    let response = (await fetch("https://wildocean.herokuapp.com/api/v1/person/" + matricola));
    let person = await response.json();

    let response1 = (await fetch("https://wildocean.herokuapp.com/api/v1/person/" + matricola + "/event"));
    let event = await response1.json();

    let response2 = (await fetch("https://wildocean.herokuapp.com/api/v1/person/" + matricola + "/services"));
    let services = await response2.json();

    //console.log(events);
    console.log(event);
    console.log(person);
    console.log(services);

    let html = '<ol class="breadcrumb"  >\n' +
        '      <li class="breadcrumb-item">\n' +
        '        <a href="crew.html">Crew</a>\n' +
        '      </li>\n' +
        '      <li class="breadcrumb-item active">' + person[0].name + ' ' + person[0].surname + '</li>\n' +
        '    </ol>'

    html += createPerson(person[0])

    let ap = "'";
    html += '<div class="row"><h2>' +person[0].name + ap + 's Activities</h2></div>'
    for (let s of services) {
        let response4 = (await fetch("https://wildocean.herokuapp.com/api/v1/services/"+ s.service_id));
        let serv = await response4.json();

        console.log(serv);
        html += createService(serv[0]);
    }
    html += '<div class="row text-center"><h2><u>' +person[0].name + ap + 's organising</u></h2></div>'
    html += createEvent(event[0]);
    $('#person').append(html)


}

function matricolaToDisplay() {

    console.log("Getting event_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    return parseInt(searchParams.get("id"));

}

function createPerson(person) {
    return  '<div class="row">' +
        '<div class="col-lg-6">' +
        '<img class="img-fluid rounded" alt="Missing" src=' + person.img + '>' +
        '</div>' +
        '<div class="col-lg-6 text-center">'+
        '<h2>' +  person.name + ' ' + person.surname +'</h2>' +
        '<p>' + person.role + '</p>' +
        '<p>' + person.description + ' </p>' +
        '<p>' + person.phone + '</p>' +
        '<p>' + person.mail +' </p>' +
        '<p>' + person.nationality +' </p>' +
        '<div  class="fa fa-instagram" ></div>\n' +
        '<div  class="fa fa-facebook"></div>\n' +
        '<div  class="fa fa-twitter"></div>\n' +
        '<div  class="fa fa-linkedin"></div>\n' +
        '<div  class="fa fa-youtube"></div>\n' +
        '</div>'
}

function createService(service) {
    return ' <div class="col-lg-4 mb-4">\n' +
    '        <div class="card h-100 text-center">\n' +
    '          <img class="card-img-top" src=' + service.img[0] + ' alt="Missing">\n' +
    '          <div class="card-body">\n' +
    '            <h4 class="card-title">' + service.title +'</h4>\n' +
    '            <p class="card-text">' + service.short_description +'</p>\n' +
    '              <a href="service.html?id='+ service.service_id + '" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>'
}

function createEvent(event) {
    return '<div class="row">' +
        '      <div class="col-lg-9 text-center">' +
        '          <h4>' + event.title +'</h4>' +
        '           <p>' + event.short_description +'</p>' +
        '           <a href="kot_event.html?id='+ event.event_id + '" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '      </div>' +
        '      <div class="col-lg-3">' +
        '         <img class="img-fluid rounded" src='+ event.img + ' alt="Missing">' +
        '      </div>' +
        '      </div>' +
        '  </div>'

}