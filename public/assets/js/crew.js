"use strict";

$(document).ready( function() {

    fetchCrew();

});

async function fetchCrew() {

    let people_response = (await fetch("https://wildocean.herokuapp.com/api/v1/person"));
    if (!people_response.ok) {
        console.log("HTTPS API Error, status = " + people_response.status);
        location.replace("../assets/pages/404.html");
    }
    let people = await people_response.json();

    let html = '<div class="row">';
    for (let i = 0; i < people.length; i++) {
        let img_circle = personRounded(people[i].img);
        html += displayPerson(people[i], img_circle);
    }

    html += '</div>'
    $('#people-row').append(html)

}

function displayPerson(person, img_circle) {
    return '<div class="col-lg-4 mb-4">'+
        '<div class="card h-100 text-center" style="border-radius: 15px"> ' +
        '<img class="card-img-top" alt="Missing" src='+ img_circle + ' '+ 'height="250" style="padding-top: 20px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ person.name + ' '+ person.surname + '</h4>' +
        '<p class="card-text">' + person.role + '</p>' +
        '<div class="text-center" style="margin-top: 20px;">' +
        '<a href="person.html?id='+ person.matricola +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// utils
function personRounded(img) {
    let img_circle = img.substr(0, 28);
    img_circle += '_rounded.svg'
    return img_circle
}
