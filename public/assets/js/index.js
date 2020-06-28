"use strict";

$(document).ready( function() {

    //fetchServices();
    fetchHomepage();
});

async function fetchHomepage() {

    let service_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services"));
    if (!service_response.ok) {
        console.log("HTTPS API Error, status = " + service_response.status);
        location.replace("../assets/pages/404.html");
    }
    let service = await service_response.json();
    $("#text").text(service[0].short_description);
    $("#text2").text(service[0].short_description);

    let testimonials_response = (await fetch("https://wildocean.herokuapp.com/api/v1/testimonials"));
    if (!testimonials_response.ok) {
        console.log("HTTPS API Error, status = " + testimonials_response.status);
        location.replace("../assets/pages/404.html");
    }
    let testimonials = await testimonials_response.json();

    let html = "";
    html += displayTestimonialSlider(testimonials);

    let html_2 = displayServices(service);

    $("#testimonial").append(html);
    $("#services").append(html_2);
}

function displayTestimonialSlider(testimonials) {

    let html = '<div class="container-fluid nopadding">' +
        '<div id="carousel_testimonial" class="carousel slide" data-ride="carousel">';

    html += '<div class="carousel-inner" role="listbox">' +
        '<div class="carousel-item active text-center"  style="height: 300px; padding-top: 55px"> '+
        '<div class="container">' +
            '<h3>'+ testimonials[0].review + '</h3>' +
        '</div>' +
        '<h4>' + testimonials[0].name + ' ' + testimonials[0].surname + '</h4>' + '</div>';

    for (let i = 1; i < testimonials.length; i++) {
        html += '<div class="carousel-item text-center"  style="height: 300px; padding-top: 55px"> '+
            '<div class="container"> <h3>'+ testimonials[i].review + '</h3>' + '</div>'  +
            '<h4>' + testimonials[i].name + ' ' + testimonials[i].surname + '</h4>' +
            '</div>';
    }

    html += '<a class="carousel-control-prev" href="#carousel_testimonial" role="button" data-slide="prev">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '<span class="sr-only">Previous</span>' +
        '</a>' +
        '<a class="carousel-control-next" href="#carousel_testimonial" role="button" data-slide="next">' +
        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '<span class="sr-only">Next</span>' +
        '</a>' + '</div>';

    return html;

}

function displayServices(service) {

    let service_one = service[Math.floor(Math.random() * service.length)];
    console.log(service_one);

    const index = service.indexOf(service_one);
    service.splice(index, 1);

    let service_two = service[Math.floor(Math.random() * service.length)];


    return '<div class="container nopadding" style="text-align: left">' +
              '<div class="row">' +
                  '<div class="col-md-5">' +
                      '<img class="img-fluid" alt="img_service_2" src="'+service_one.img[0].slice(3)+'">' +
                  '</div>' +
                  '<div class="col-md-7" style="margin-top: 20px;">' +
                     '<div class="item">' +
                          '<h3 style="color: #0077C0">'+service_one.title+'</h3>' +
                          '<p id="text" style="margin-top: 15px">'+service_one.short_description+'</p>' +
                      '</div>' +
                      '<div class="text-left" style="margin-left: 20px">' +
                         '<a href="./pages/service.html?id='+service_one.service_id+'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
                      '</div>' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '<div class="container nopadding">' +
              '<hr style="width: 90%; height: 1px; color: #4eb5e5; background-color: #4eb5e5; margin-top: 80px; margin-bottom: 80px">' +
          '</div>' +
        '<div class="container nopadding">' +
              '<div class="row">' +
                  '<div class="col-md-7" style="margin-top: 20px; text-align: left" >' +
                      '<div class="item">' +
                          '<h3 style="color: #0077C0">'+ service_two.title +'</h3>' +
                          '<p id="text2" style="margin-top: 15px">'+ service_two.short_description +'</p>' +
                      '</div>' +
                      '<div class="text-left" style="margin-left: 20px; margin-bottom: 70px">' +
                          '<a href="./pages/service.html?id='+ service_two.service_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px;"><b>FIND OUT MORE</b></span></a>' +
                      '</div>' +
                  '</div>' +
                  '<div class="col-md-5">' +
                      '<img src="'+service_two.img[0].slice(3)+'" class="img-fluid" alt="img_service_2">' +
                  '</div>' +
              '</div>' +
        '</div>';

}

