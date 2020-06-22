"use strict";

$(document).ready( () => {

    getTestimonials();


});

async function getTestimonials() {
    let testimonials;
    try {
         fetch("ap1/v1/testimonials").then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTPS API Error, status = " + response.status);
                }
                return response.json();
             }).then(function (json) {
                 testimonials = document.createElement("h1");
                 testimonials.innerHTML = `${json.name}`;
                 console.log(json);
         })

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}