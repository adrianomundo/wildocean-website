"use strict";

$(document).ready( function() {

    getTestimonials();


});

async function getTestimonials() {
    let testimonials;
    try {
         fetch("api/v1/text").then(function (response) {
                if (!response.ok) {
                    console.log("HTTPS API Error, status = " + response.status);
                }
                return response.json();
             }).then(function (json) {
                 var trial = document.getElementById("testimonial");
                 let { page, section, text } = json[0];
                 trial.innerHTML = `${page} - ${section} - ${text}`;
                 //testimonials = document.createElement("h1");
                 //testimonials.innerHTML = `${json.name}`;
                 console.log(json);
         });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}