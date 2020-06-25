"use strict"

$(document).ready( () => {

    serviceToDisplay();

});

async function fetchServices() {

}

function serviceToDisplay() {

    console.log("Getting service_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    let service_id = parseInt(searchParams.get("id"));
    console.log(service_id);

}