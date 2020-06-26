"use strict"

$(document).ready( () => {

    fetchService();

});

async function fetchService() {

    let service_id = serviceToDisplay();

    let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id));
        if (!service_response.ok) {
            console.log("HTTPS API Error, status = " + service_response.status);
            location.replace("../assets/pages/404.html");
        }
    let service = await service_response.json();

    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id + "/event"));
        if (!event_response.ok) {
            console.log("HTTPS API Error, status = " + event_response.status);
            location.replace("../assets/pages/404.html");
        }
    let event = await event_response.json();

    let people_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id + "/people"));
        if (!people_response.ok) {
            console.log("HTTPS API Error, status = " + people_response.status);
            location.replace("../assets/pages/404.html");
        }
    let people = await people_response.json();

    console.log(service[0]);
    console.log(event[0]);
    console.log(people);

    pageTitle(service[0]);

    let html = "";
    html = displayServiceSlider(service[0]);
    html += displayServiceInfo(service[0]);
    html += displayServiceEvent(service[0]);
    html += displayServiceCrew(people[0]);

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

// slider + orientation info
function displayServiceSlider(service) {
    return `<div class="container-fluid nopadding">
          <div id="carousel_service" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                  <li data-target="#carousel_service" data-slide-to="0" class="active"></li>
                  <li data-target="#carousel_service" data-slide-to="1"></li>
              </ol>
          <div class="carousel-inner" role="listbox">
              <div class="carousel-item active">
                  <img class="img-slider" src="`+ service.img[0] + `" alt="service_first_img">
              </div>
              <div class="carousel-item">
                  <img class="img-slider" src="`+ service.img[1] + `" alt="service_second_img">
              </div>
          </div>
          <a class="carousel-control-prev" href="#carousel_service" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carousel_service" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
          </a>
          </div>
          <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                      <a href="services.html" aria-current="page" style="color: black">Services</a>
                  </li>
                  <li class="breadcrumb-item active">
                      <a id="breadcrumb_service_title" aria-current="page" style="color: #0077C0">`+ service.title +`</a>
                  </li>
              </ol>
          </nav>
      </div>`;
}

// service and practical info
function displayServiceInfo(service) {
    return `<div class="container" id="service_info" style="text-align: center">
          <h1 class="custom_heading align-center" style="text-align: center"><b>`+ service.title +`</b></h1>
          <p>`+ service.long_description +`</p>
          <h2 class="custom_heading align-center" style="text-align: center"><b>Practical Info</b></h2>
          <p>`+ service.practical_info +`</p>
      </div>`;
}

// featured event
function displayServiceEvent(event) {

    return `<div class="container" id="service_event" style="text-align: center">
          <h2 class="custom_heading align-center"><strong>Featured Event</strong></h2>
          <div class="row" id="featured_event">
              <div class="col-lg-5 text-center">
                  <img class="img-fluid rounded" src="" alt="ocean_talk">
              </div>
              <div class="col-lg-7 text-left" style="margin-top: 20px;">
                <h3 style="color: #0077C0; margin-bottom: 20px;"><strong>Event Title</strong></h3>
                <p>Each autumn we brace ourselves against the inevitable mass accumulation of plastic pollution upon our beaches.
                    Each autumn we brace ourselves against the inevitable mass accumulation of plastic pollution upon our beaches.</p>
                <div class="text-left" style="margin-top: 30px;">
                    <a href="service.html?id=\`+event_id+\`" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>
                </div>
              </div>
          </div>
        </div>`;

}

// related crew
function displayServiceCrew(people) {

    return `<div class="container" id="service_crew" style="text-align: center">
          <h2 class="custom_heading align-center" id="crew" style="text-align: center"><strong>Related Crew</strong></h2>
          <div class="row justify-content-center">
              <div class="col-lg-4 mb-4">
                  <div class="card h-100 text-center" style="border-radius: 15px">
                    <img class="card-img-top" alt="Missing" src="../assets/img/person/Person3_rounded.svg" height="250" style="padding-top: 20px">
                  <div class="card-body">
                      <h4 class="card-title">Adriano Mundo</h4>
                      <p class="card-text">Chief Innovation Officer</p>
                  <div class="text-center" style="margin-top: 20px;">
                      <a href="service.html?id=\`+person_id+\`" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>
                  </div>
                  </div>
                  </div>
              </div>
          </div>
      </div>`

}

// utils
function personRounded(img) {
    let img_circle = img.substr(0, 28);
    img_circle += '_rounded.svg'
    return img_circle
}