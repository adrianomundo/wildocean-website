"use strict";

$(document).ready( function() {

    getEvents();


});

async function getEvents() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/events/1/person").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {

            console.log(json);
        });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}