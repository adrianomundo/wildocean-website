"use strict";

$(document).ready( function() {

    getTestimonials();


});

async function getTestimonials() {
    let testimonials;
    try {
         fetch("https://wildocean.herokuapp.com/api/v1/testimonials").then(function (response) {
                //if (!response.ok) {
                //    throw new Error("HTTPS API Error, status = " + response.status);
                //}
                return response.json();
             }).then(function (json) {
                 for (var i = 0; i < json.length; i++) {
                     var listTestimonial = document.createElement("h1");
                     let { name, surname, review } = json[i];
                     listTestimonial.innerHTML = `${name} - ${surname} - ${review}`
                 }
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