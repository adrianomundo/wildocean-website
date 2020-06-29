"use strict"

$(document).ready( () => {

    fetchService();

});

async function fetchService() {

    let service_id = serviceToDisplay();

    let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id));
    if (!service_response.ok) {
        console.log("HTTPS API Error, status = " + service_response.status);
        location.replace("../pages/404.html");
    }

    let all_service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/service"))
    let all_service = await all_service_response.json()

    if (service_id > all_service.length) location.replace("../pages/404.html");

    let service = await service_response.json();

    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id + "/event"));
    if (!event_response.ok) {
        console.log("HTTPS API Error, status = " + event_response.status);
        location.replace("../pages/404.html");
    }
    let event = await event_response.json();

    let people_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id + "/people"));
    if (!people_response.ok) {
        console.log("HTTPS API Error, status = " + people_response.status);
        location.replace("../pages/404.html");
    }
    let people = await people_response.json();

    console.log(service[0].img);
    console.log(event[0]);
    console.log(people);
    console.log(people[0]);

    pageTitle(service[0]);

    let html = "";

    let imgArray = service[0].img;
    html += displayServiceSlider(imgArray);
    html += displayOrientation(service[0]);
    html += displayServiceInfo(service[0]);
    if (event.length > 0) {
        html += displayServiceEvent(event[0]);
    }
    html += createCrewContainer();
    for (let i = 0; i < people.length; i++) {
        let img_circle = personRounded(people[i].img)
        html += displayServiceCrew(people[i], img_circle);
    }
    $("#service").append(html);

}

// get id of the service to display
function serviceToDisplay() {

    console.log("Getting service_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    return parseInt(searchParams.get("id"));

}

// setting title relative to the service
function pageTitle(service) {
    $("#page_title").text("Wild Ocean | " + service.title);
}

function displayServiceSlider(imgArray) {

    let html = '<div class="container-fluid nopadding">' +
        '<div id="carousel_service" class="carousel slide" data-ride="carousel">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#carousel_service" data-slide-to="0" class="active"></li>';
    for (let i = 1; i < imgArray.length; i++) {
        html += '<li data-target="#carousel_service" data-slide-to=" ' + i + '"></li>';
    }
    html += '</ol>';

    html += '<div class="carousel-inner" role="listbox">' +
        '<div class="carousel-item active">' +
        '<img class="img-slider" src=" ' + imgArray[0] + '" alt="service_first_img">' +
        '</div>';
    for (let i = 1; i < imgArray.length; i++) {
        html += '<div class="carousel-item">' +
            '<img class="img-slider" src="' + imgArray[i] + '" alt="service_second_img">' +
            '</div>' +
            '</div>';
    }
    html += '<a class="carousel-control-prev" href="#carousel_service" role="button" data-slide="prev">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '<span class="sr-only">Previous</span>' +
        '</a>' +
        '<a class="carousel-control-next" href="#carousel_service" role="button" data-slide="next">' +
        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '<span class="sr-only">Next</span>' +
        '</a>' + '</div>';
    return html;
}

function displayOrientation(service) {
    return `<nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                      <a href="services.html" aria-current="page" style="color: black">Services</a>
                  </li>
                  <li class="breadcrumb-item active">
                      <a id="breadcrumb_service_title" aria-current="page" style="color: #0077C0"> `+ service.title +`</a>
                  </li>
              </ol>
          </nav>
      </div>`;
}

// service and practical info
function displayServiceInfo(service) {
    return `<div class="container" id="service_info" style="text-align: center">
          <h1 class="custom_heading align-center">`+ service.title +`</h1>
          <p>`+ service.long_description +`</p>
          <h2 class="custom_heading align-center">Practical Info</h2>
          <p>`+ service.practical_info +`</p>
      </div>`;
}

// featured event
function displayServiceEvent(event) {

    return `<div class="container" id="service_event" style="text-align: center">
          <h2 class="custom_heading align-center">Featured Event</h2>
          <div class="row" id="featured_event">
              <div class="col-lg-5 text-center">
                  <img class="img-fluid rounded" src="`+ event.img +` " alt="ocean_talk">
              </div>
              <div class="col-lg-7 text-left" style="margin-top: 20px;">
                <h3 style="color: #0077C0; margin-bottom: 20px;">`+ event.title +`</h3>
                <p>`+ event.short_description +`</p>
                <div class="text-left" style="margin-top: 30px;">
                    <a href="event.html?id= `+ event.event_id +`" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>
                </div>
              </div>
          </div>
        </div>`;

}

function createCrewContainer() {
    return `<div class="container" id="service_crew" style="text-align: center">
        <h2 class="custom_heading align-center" id="crew" style="text-align: center">Related Crew</h2>
    <div class="row justify-content-center" id="crew_row">`;
}

// related crew
function displayServiceCrew(people, img_circle) {
    return `<div class="col-lg-4 mb-4">
                  <div class="card h-100 text-center" style="border-radius: 15px">
                    <img class="card-img-top" alt="Missing" src="`+ img_circle +`" height="250" style="padding-top: 20px">
                  <div class="card-body">
                      <h4 class="card-title">`+ people.name +` ` + people.surname +`</h4>
                      <p class="card-text">`+ people.role + `</p>
                  <div class="text-center" style="margin-top: 20px;">
                      <a href="person.html?id=` + people.matricola + `" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>
                  </div>
                  </div>
                  </div>
              </div>`;
}

// utils
function personRounded(img) {
    let img_circle = img.substr(0, 28);
    img_circle += '_rounded.svg'
    return img_circle
}