"use strict";

$(document).ready( function() {

    //fetchServices();
    fetchTestimonials()
});

async function fetchTestimonials() {
    let response = (await fetch("https://wildocean.herokuapp.com/api/v1/testimonials"));
    let testimonials = await response.json();
    console.log(testimonials);
    let html = '<div class="container-fluid nopadding" style="background-color: rgba(47,151,239,.15)">' +
        '          <div id="carousel_testimonial" class="carousel slide" data-ride="carousel">' +
        '              <ol class="carousel-indicators">' +
        '                  <li data-target="#carousel_testimonial" data-slide-to="0" class="active"></li>'
        for ( let i = 0; i < testimonials.length-1; i++ ) {
            html += '<li data-target="#carousel_testimonial" data-slide-to="' + (i + 1) + '"></li> ';
        }
       // '                  <li data-target="#carousel_service" data-slide-to="1"></li>' +
        //'                  <li data-target="#carousel_service" data-slide-to="2"></li>' +
        //'                  <li data-target="#carousel_service" data-slide-to="3"></li>' +
        html += ' </ol>' + '<div class="carousel-inner" role="listbox">'

        for ( let i = 0; i < testimonials.length; i++ ) {
          console.log(testimonials[i])
            if (i == 0) html += createSlideFirst(testimonials[i]);
            else html += createSlide(testimonials[i]);
        }

        html +=

        '          <a class="carousel-control-prev" href="#carousel_service" role="button" data-slide="prev">' +
        '              <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '              <span class="sr-only">Previous</span>' +
        '          </a>' +
        '          <a class="carousel-control-next" href="#carousel_service" role="button" data-slide="next">' +
        '              <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '              <span class="sr-only">Next</span>' +
        '          </a>' +
        '          </div>'

    //for ( let i = 0; i < testimonials.length; i++ ) {
      //  console.log(testimonials[i])
      //  html += createSlide(testimonials[i]);
   // }

    //html += '</div>' +
       /* '  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
        '    <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '    <span class="sr-only">Previous</span>' +
        '  </a>' +
        '  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' +
        '    <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '    <span class="sr-only">Next</span>' +
        '  </a>' +*/
       // '</div>'

    $('#testimonial').append(html)
}

async function fetchServices() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/services").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status)
            }
            return response.json();
        }).then(function (json) {
            let service_1 = json[0];
            let service_2 = json[1];
            displayServices(service_1.service_id, service_1.title, service_1.short_description);
            displayServices(service_2.service_id, service_2.title, service_2.short_description);
            //TODO aggiungere la prima immagine
            //TODO link alla pagine del singolo servizio
        })
    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }
}


function displayServices(service_id, title, description) {
    $("#title" + service_id).text(title);
    $("#description" + service_id).text(description);
}

function createSlide(testimonial) {
    return '<div class="carousel-item  text-center"  style="height: 300px; padding-top: 100px"> '+
        '       <h3>'+ testimonial.review +'</h3>' +
        //'        <div class="row text-center">' + testimonial.name + ' ' + testimonial.surname + '</div>'  +
        '       <p>' + testimonial.name + ' ' + testimonial.surname + '</p>' +
        '    </div>';
}

function createSlideFirst(testimonial) {
    return '<div class="carousel-item active text-center"  style="height: 300px; padding-top: 150px"> '+
        '       <h3>'+ testimonial.review +'</h3>' +
        //'          <div class="row text-center">' + testimonial.name + ' ' + testimonial.surname + '</div>'  +
        '        <p>' + testimonial.name + ' ' + testimonial.surname + '</p>' +
        '    </div>';
}
function create(testimonial) {
    return '<div class="mySlides fade" style="background:#ffffff">' +
        '        <div class="text" style="color: #1b1e21">'+ testimonial.review +'</div>' +
        '        <p>' + testimonial.name + ' ' + testimonial.surname + '</p>' +
        '  </div>'

}