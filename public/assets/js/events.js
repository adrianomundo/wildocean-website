"use strict";

$(document).ready( function() {

    fetchEvents();

});

async function fetchEvents() {

    let events_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
    if (!events_response.ok) {
        console.log("HTTPS API Error, status = " + events_response.status);
        location.replace("../pages/404.html");
    }
    let events = await events_response.json();

    let html = "";
    for(let i = 0; i < events.length; i++) {
        html += displayEventCard(events[i]);
    }

    $('#all-events').append(html);
    $('#all_button').prop("disabled", true);

    //shadowHover();

}

function view(type) {

    let month_container = document.getElementById("month_container");

    if (type == "all") {
        $('#all_button').prop("disabled", true);
        $('#by_month_button').prop("disabled", false);

        if (month_container.childElementCount) {
            let month_view = document.getElementById("month_view");
            month_view.remove();
            displayEvents("00");
        }
    }
    else {
        $('#all_button').prop("disabled", false);
        $('#by_month_button').prop("disabled", true);

        if (month_container.childElementCount == 0) {
            $("#month_container").append(monthView());
            $('#drop_month').text("February");
            displayEvents('02');
        }
    }
    //shadowHover();

}

function monthView() {

    return `<div class="row justify-content-between" id="month_view">
            <div class="col-xs-1 text-left">
            <button class="btn dropdown-event dropdown-toggle" type="button" id="drop_month" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false" style="font-size: 17px;
        font-weight: 600;">MONTH</button>
        <div class="dropdown-menu" style="color: #0077C0">
        <a class="dropdown-item" style="color: black" onclick="getMonth('01')" >January</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('02')" >February</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('03')" >March</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('04')" >April</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('05')" >May</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('06')" >June</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('07')" >July</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('08')" >August</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('09')" >September</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('10')" >October</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('11')" >November</a>
        <a class="dropdown-item" style="color: black" onclick="getMonth('12')" >December</a>
        </div>
        </div>
        <div class="col-xs-1 text-right" style="padding-right: 15px;">
        <a id="prev_link" style="text-decoration: none" onclick="getMonth('01')">
        <i class="fa fa-arrow-left nav_arrow" id="prev_arrow" style="font-size: 18px; color: #0077C0"></i>
        </a>
        <a id="next_link" style="text-decoration: none" onclick="getMonth('03')">
        <i class="fa fa-arrow-right nav_arrow" id="next_arrow" style="font-size: 18px; color: #0077C0"></i>
        </a>
        </div>
        <hr style="height: 1px; width: 90%; color: #0077C0; background-color: #0077C0; padding-right: 50px;">
        </div>`;
}

function fixNavigationArrow() {

    let month_string = monthNumber($('#drop_month').text());
    let month = parseInt(month_string);
    let next_month = month + 1;
    let next_month_string = next_month.toString();
    let prev_month = month - 1;
    let prev_month_string = prev_month.toString();

    if (next_month_string.length == 1) {
        next_month_string = "0" + next_month;
    }
    if (prev_month_string.length == 1) {
        prev_month_string = "0" + prev_month_string;
    }

    prev_month = "'" + prev_month_string + "'";
    next_month = "'" + next_month_string + "'";

    $('#prev_link').removeAttr('onclick');
    $('#prev_link').attr('onclick', 'getMonth('+ prev_month +')');
    $('#next_link').removeAttr('onclick');
    $('#next_link').attr('onClick', 'getMonth('+ next_month +')');

    if (prev_month_string == "00") {
        $('#prev_link').removeAttr('onclick');
        let dec = "'" + "12" + "'";
        $('#prev_link').attr('onclick', 'getMonth(' + dec +')');
    }
    if (next_month_string == "13") {
        $('#next_link').removeAttr('onclick');
        let gen = "'" + "01" + "'";
        $('#next_link').attr('onclick', 'getMonth(' + gen +')');
    }
}

function getMonth(month) {
    $('#drop_month').text(monthName(month));
    fixNavigationArrow();
    displayEvents(month);
}

async function displayEvents(number) {

    let month = number;
    let event_response = (await fetch("https://wildocean.herokuapp.com/api/v1/events"));
    if (!event_response.ok) {
        console.log("HTTPS API Error, status = " + event_response.status);
        location.replace("../pages/404.html");
    }
    let events = await event_response.json();

    console.log(events);

    let events_to_remove = document.getElementById("all-events");
    let number_to_remove = events_to_remove.childElementCount;
    if (number_to_remove) {
        for (let i = 0; i < number_to_remove; i++) {
            events_to_remove.children[0].remove();
        }
    }
    let html = "";
    let count_event = 0;
    for (let i = 0; i < events.length; i++) {
        if (checkMonth(events[i], month) === 1 ) {
            html += displayEventCard(events[i]);
            count_event++;
        }
    }
    if (count_event == 0) {
        html += '<div class="container text-center">' +
            '<h1 style="margin-bottom: 60px;">There are no events for this month, sorry bro!</h1>' +
            '</div>';
    }

    $('#all-events').append(html);
    //shadowHover();

}


// dynamic card content creation
function displayEventCard(event) {

    return '<div class="col-lg-4 mb-4" >'+
        '<div class="card h-100 text-center goup" style="border-radius: 15px !important; -webkit-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.12); border: 0;"> ' +
        '<img class="card-img-top" alt="'+event.title+ ' " src="'+ event.img +'" style="border-top-left-radius: 15px; border-top-right-radius: 15px">' +
        '<div class="card-body">' +
        '<h4 class="card-title">'+ event.title + '</h4>' +
        '<div class="date_event">' +
        '<i class="fa fa-calendar" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">' + event.date.substr(0, 10) + '</p>' +
        '</div>'+
        '<div class="hour_event">' +
        '<i class="fa fa-clock-o" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">'+ event.start_h + ' - ' + event.end_h +  '</p>' +
        '</div>'+
        '<div class="loc_event">' +
        '<i class="fa fa-globe" style="font-size: 20px;"></i>' +
        '<p style="display: inline-block">'+ event.location + '</p>' +
        '</div>'+
        '<a href="event.html?id=' + event.event_id +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px; font-weight: 600;">FIND OUT MORE</span></a>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function checkMonth(event, number) {

    let month = event.date.substr(5,7);
    let month1 = month.substr(0,2);
    parseInt(month1);
    console.log(month1);
    console.log(number);
    if (month1 === number || number === "00") return 1;
    else return 0;
}

function shadowHover() {

    $(".card").hover( function() {
            $(this).addClass('shadow-lg').css('cursor','pointer');
        }, function() {
            $(this).removeClass('shadow-lg');
        }
    );

}

// utils
function monthName(number) {
    if (number == 1) { return "January"; }
    else if (number == 2) { return "February"; }
    else if (number == 3) { return "March"; }
    else if (number == 4) { return "April"; }
    else if (number == 5) { return "May"; }
    else if (number == 6) { return "June"; }
    else if (number == 7) { return "July"; }
    else if (number == 8) { return "August"; }
    else if (number == 9) { return "September"; }
    else if (number == 10) { return "October"; }
    else if (number == 11) { return "November"; }
    else return "December";
}

function monthNumber(name) {
    if (name == "January") { return "01"; }
    else if (name == "February") { return "02"; }
    else if (name == "March") { return "03"; }
    else if (name == "April") { return "04"; }
    else if (name == "May") { return "05"; }
    else if (name == "June") { return "06"; }
    else if (name == "July") { return "07"; }
    else if (name == "August") { return "08"; }
    else if (name == "September") { return "09"; }
    else if (name == "October") { return "10"; }
    else if (name == "November") { return "11"; }
    else if (name == "December") { return "12"; }
}