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
            $("#data").text(json[3].txt);
            $("#think").text(json[4].txt);
            $("#nature").text(json[5].txt);
            $("#focused").text(json[6].txt);
            $("#strive").text(json[7].txt);
            $("#iterative").text(json[8].txt);
            $("#build").text(json[9].txt);
            $("#profit").text(json[10].txt);
            $("#impact").text(json[11].txt);
            console.log(json);
        });
    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}