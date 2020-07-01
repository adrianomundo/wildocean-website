"use strict";

$(document).ready( function() {

    fetchCrew();

});

async function fetchCrew() {

    let page = crewPageToDisplay();
    console.log(page);

    let people_response = (await fetch("https://wildocean.herokuapp.com/api/v1/person"));
    if (!people_response.ok) {
        console.log("HTTPS API Error, status = " + people_response.status);
        //location.replace("../pages/404.html");
    }
    let people = await people_response.json();

    let people_number = people.length;
    let people_per_page = 6;
    let pages_number = Math.ceil(people_number / people_per_page);

    let html = '<div class="row">';

    let offset = page * people_per_page;
    let people_page_response = (await fetch("https://wildocean.herokuapp.com/api/v1/person?" + "limit=" + people_per_page + "&offset=" + offset));
    if (!people_page_response.ok) {
        console.log("HTTPS API Error, status = " + people_page_response.status);
        //location.replace("../pages/404.html");
    }
    let people_page = await people_page_response.json();

    for (let i = 0; i < people_page.length; i++) {
        let img_circle = personRounded(people_page[i].img);
        html += displayPerson(people_page[i], img_circle);
    }
    html += '</div>'

    html += displayNavigationPages(pages_number);

    $('#people-row').append(html);

    $("#page_button_" + (page+1)).toggleClass('disabled');

    shadowHoverCrew();


}

function crewPageToDisplay() {

    console.log("Getting page to display");
    let searchParams = new URLSearchParams(window.location.search);
    let page_number = parseInt(searchParams.get("page"));
    if (isNaN(page_number)) {
        page_number = 1;
    }
    console.log(page_number);
    return page_number - 1;

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

function displayNavigationPages(pages_num) {

    let html = '<div class="row justify-content-end" style="text-align: right; padding-right: 35px; padding-top: 0" >' +
                    '<nav aria-label="crew_pages">' +
                        '<ul class="pagination pagination-md">';
    for (let i = 1; i <= pages_num; i++) {
        if (i == 1) {
            html += '<li class="page-item" id="page_button_1"><a class="page-link" id="page_link_1" style="color: #0077C0" href="crew.html">'+ i +'</a></li>';
        }
        else {
            html += '<li class="page-item" id="page_button_'+ i +'"><a class="page-link" id="page_link_'+ i +'" style="color: #0077C0" href="crew.html?page='+ i +'">'+ i +'</a></li>';
        }
    }
    html += '</ul>' + '</nav>' + '</div>';
    return html;
}

function shadowHoverCrew() {

    $(".card").hover( function() {
            $(this).addClass('shadow-lg').css('cursor','pointer');
        }, function() {
            $(this).removeClass('shadow-lg');
        }
    );

}

/*function displayNavigationPages(pages_num) {

    let html = "";

    html += '<div class="row justify-content-end" style="text-align: right; padding-right: 35px; padding-top: 0" >' +
        '<nav aria-label="crew_pages">' +
        '  <ul class="pagination pagination-md">' +
        '    <li class="page-item disabled">' +
        '      <a class="page-link" href="#" tabindex="-1">1</a>' +
        '    </li>' +
        '    <li class="page-item"><a class="page-link" style="color: #0077C0" href="#">2</a></li>' +
        '    <li class="page-item"><a class="page-link" style="color: #0077C0" href="#">3</a></li>' +
        '  </ul>' +
        '</nav>' +
        '</div>';

    return html;
}*/

// utils
function personRounded(img) {
    let img_circle = img.substr(0, 28);
    img_circle += '_rounded.svg'
    return img_circle
}
