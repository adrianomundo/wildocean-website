"use strict";

$(document).ready( function() {

    getPerson();


});

async function getPerson() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/services/1").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {
            json[0].images = "string";
            console.log(json[0]);
        });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}