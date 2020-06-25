"use strict";

$(document).ready( function() {

    getOurServicesBro();


});

async function getOurServicesBro() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/services/").then(function (response) {
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