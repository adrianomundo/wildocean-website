"use strict"

$(document).ready( () => {

    serviceToDisplay();

});

async function fetchServices() {

    try {
        fetch("https://wildocean.herokuapp.com/api/v1/services").then( (response) => {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then( (json) => {
            let html = "";
            let service_id, title, short_descr, images, first_img;
            for(let s of json) {
                service_id = s.service_id;
                title = s.title;
                short_descr = s.short_description;
                images = s.img;
                first_img = images[0];
                html += serviceCard(service_id, title, short_descr, first_img)
            }
            $('#services').append(html);
            window.location = "./service.html?id=" + service_id;
            console.log(json);
        });
    }
    catch (e) {
        location.replace("../assets/pages/404.html");
        console.log(e);
    }

}

function serviceToDisplay() {
    console.log("Getting service_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    let service_id = searchParams.get('id');
    console.log(service_id);
    window.location = "../assets/pages/service.html?id= `+ service_id +`";

}