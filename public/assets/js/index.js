"use strict";

$(document).ready( function() {

    fetchServices();
    fetchTestimonials()
});

async function fetchTestimonials() {
    let response = (await fetch("https://wildocean.herokuapp.com/api/v1/testimonials"));
    let testimonials = await response.json();
    console.log(testimonials);
    let html = '<div class="slideshow-container">'

    for ( let i = 0; i < testimonials.length; i++ ) {
        console.log(testimonials[i])
        html += create(testimonials[i]);
    }

    html += ' <a class="prev" onclick="plusSlides(-1)">&#10094;</a>' +
        '  <a class="next" onclick="plusSlides(1)">&#10095;</a>' +
        '</div>' +
        '<br>'

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
    return '<div class="carousel-item active" style="background:#ffffff">' +
        '          <div class="carousel-caption d-none d-md-block">' +
        '            <h3>'+ testimonial.review +'</h3>' +
        '            <p>' + testimonial.name + ' ' + testimonial.surname + '</p>' +
        '          </div>' +
        '        </div>'
}

function create(testimonial) {
    return '<div class="mySlides fade" style="background:#ffffff">' +
        '        <h3>'+ testimonial.review +'</h3>' +
        '        <p>' + testimonial.name + ' ' + testimonial.surname + '</p>' +
        '  </div>'

}