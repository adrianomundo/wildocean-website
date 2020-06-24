"use strict";

$(document).ready( function() {

    fetchServices();

});

async function fetchTestimonials() {
    let testimonials;
    try {
         fetch("https://wildocean.herokuapp.com/api/v1/testimonials").then(function (response) {
                if (!response.ok) {
                    console.log("HTTPS API Error, status = " + response.status);
                }
                return response.json();
             }).then(function (json) {
                 for(let review of json) {

                 }
                 let { page, section, txt } = json[0];
                 console.log(json);
         });

    }
    catch (e) {
        location.replace("../pages/404.html");
        console.log(e);
    }

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