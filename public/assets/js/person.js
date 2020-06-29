"use strict";

$(document).ready( function() {

    fetchPerson();


});

async function fetchPerson() {

    let matricola = matricolaToDisplay();

    let person_response = (await fetch("https://wildocean.herokuapp.com/api/v1/person/" + matricola));
    if (!person_response.ok) {
        console.log("HTTPS API Error, status = " + person_response.status);
        location.replace("../assets/pages/404.html");
    }
    let person = await person_response.json();

    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/person/" + matricola + "/event"));
    if (!event_response.ok) {
        console.log("HTTPS API Error, status = " + event_response.status);
        location.replace("../assets/pages/404.html");
    }
    let event = await event_response.json();

    let services_response = (await fetch("https://wildocean.herokuapp.com/api/v1/person/" + matricola + "/services"));
    if (!services_response.ok) {
        console.log("HTTPS API Error, status = " + services_response.status);
        location.replace("../assets/pages/404.html");
    }
    let services = await services_response.json();

    console.log(event);
    console.log(person);
    console.log(services);

    pageTitle(person[0]);

    let html = "";
    html += displayOrientation(person[0]);
    html += displayPerson(person[0]);

    let ap = "'";
    html += '<div class="row" style="text-align: center">' +
        '<div class="container" style="text-align: center">' +
        '<h2 class="custom_heading align-center">' + person[0].name + ap + 's Activities</h2>' +
        '</div>' + '</div>';

    for (let i = 0; i < services.length; i++) {

        let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + services[i].service_id));
        if (!service_response.ok) {
            console.log("HTTPS API Error, status = " + service_response.status);
            location.replace("../assets/pages/404.html");
        }
        let service = await service_response.json();
        html += displayPersonServices(service[0]);
    }

    if (event.length > 0 ) {
        html += '<div class="row text-center">' +
            '<div class="container text-center">' +
            '<h2 class="custom_heading align-center">' + person[0].name + "'" + 's organising</h2>' +
            '</div>'+ '</div>';
        html += displayEvent(event[0]);
    }
    $('#person').append(html)
}

// get matricola of the service to display
function matricolaToDisplay() {

    console.log("Getting matricola to display");
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    return parseInt(searchParams.get("id"));

}

// setting title relative to the person
function pageTitle(person) {
    $("#page_title").text("Wild Ocean | " + person.name + ' ' + person.surname);
}

// orientation info with breadcrumb
function displayOrientation(person) {
    return '<ol class="breadcrumb">' +
        '      <li class="breadcrumb-item">' +
        '        <a href="crew.html">Crew</a>' +
        '      </li>' +
        '      <li class="breadcrumb-item active">' + person.name + ' ' + person.surname + '</li>' +
        '    </ol>';
}

// display person information
function displayPerson(person) {
    return  '<div class="row justify-content-center">' +
        '<div class="col-lg-6">' +
        '<img class="img-fluid" alt="Person_img" src=' + person.img + '>' +
        '</div>' +
        '<div class="col-lg-6 text-left">'+
        '<h2>' +  person.name + ' ' + person.surname +'</h2>' +
        '<p><b>' + person.role + '</b></p>' +
        '<p>' + person.description + ' </p>' +
        '<div class="phone">' +'' +
        '<i class="fa fa-mobile" style="font-size: 15px;"></i>' +
        '<p style="display: inline-block">' + person.phone + '</p>' +
        '</div>'+
        '<div class="mail">' +
        '<i class="fa fa-envelope-o" style="font-size: 15px;"></i>' +
        '<p style="display: inline-block">' + person.mail + '</p>' +
        '</div>'+
        '<div class="nation">' +
        '<i class="fa fa-globe" style="font-size: 15px;"></i>' +
        '<p style="display: inline-block">' + person.nationality + '</p>' +
        '</div>'+
        '<div  class="fa fa-instagram" ></div>\n' +
        '<div  class="fa fa-facebook"></div>\n' +
        '<div  class="fa fa-twitter"></div>\n' +
        '<div  class="fa fa-linkedin"></div>\n' +
        '<div  class="fa fa-youtube"></div>\n' +
        '</div>'
}

// display services in which the person is involved
function displayPersonServices(service) {
    return  '<div class="col-lg-5 mb-4">' +
            '<div class="card h-100 text-center" style="border-radius: 15px">' +
            '<img class="card-img-top" src='+ serviceRounded(service.img[0]) +' '+ 'height="250" style="padding-top: 20px" alt="Missing">' +
            '<div class="card-body">' +
            '<h4 class="card-title">' + service.title + '</h4>' +
            '<p class="card-text">' + service.short_description + '</p>' +
            '<a href="service.html?id=' + service.service_id + '" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
            '</div>' +
            '</div>' +
            '</div>';
}

function displayEvent(event) {

    return '<div class="container nopadding"> ' +
        '<div class="row">' +
        '      <div class="col-md-7 text-left" style="margin-top: 20px">' +
                '<div class="item">' +
        '          <h3 style="color: #0077C0">' + event.title +'</h3>' +
        '           <p style="margin-top: 20px">' + event.short_description +'</p>' +
                '</div>' +
                '<div class="text-left" style="margin-left: 20px; margin-bottom: 70px;">' +
        '           <a href="kot_event.html?id='+ event.event_id + '" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
                '</div>'+
        '      </div>' +
        '      <div class="col-md-5">' +
        '         <img class="img-fluid" src="'+ event.img +'" alt="Missing">' +
        '      </div>' +
        '      </div>' +
        '  </div>' +
        '</div>';
}

// utils
function serviceRounded(img) {
    let img_circle = img.substr(0, img.length-4);
    img_circle += '_rounded.svg'
    return img_circle
}
