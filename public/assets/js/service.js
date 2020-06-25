"use strict"

$(document).ready( () => {

    fetchService();

});

async function fetchService() {

    let service_id = serviceToDisplay();

    let service = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id)).json();
    let event = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id + "/event")).json();
    let people = (await fetch("https://wildocean.herokuapp.com/api/v1/services/" + service_id + "/people")).json();

    console.log(service);
    console.log(event);
    console.log(people);


}

function serviceToDisplay() {

    console.log("Getting service_id to display");
    let searchParams = new URLSearchParams(window.location.search);
    return parseInt(searchParams.get("id"));


}