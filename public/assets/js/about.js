"use strict";

$(document).ready( function() {

    getTextPage();


});

async function getTextPage() {
    try {
        fetch("https://wildocean.herokuapp.com/api/v1/text/about").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {
            var trial = $("p:first");
            //for (var i = 0; i < json.length; i++) {
            let { page, section, txt } = json[0];
            if (page === "about" && section === "about us") {
                trial.innerHTML = `${txt}`;
            }
                //testimonials = document.createElement("h1");
                //testimonials.innerHTML = `${json.name}`;
            console.log(json);
            //}
        });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}