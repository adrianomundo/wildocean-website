"use strict";

$(document).ready( function() {

    getPageText("about");


});

async function getPageText(page) {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/text/" + page).then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {
            $("#about").text(json[0].txt);
            $("#vision").text(json[1].txt);
            $("#mission").text(json[2].txt);
            console.log(json);
        });
    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}