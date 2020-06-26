"use strict";

$(document).ready( function() {

    getPerson();


});

async function getPerson() {

    try {
        fetch("https://wildocean.herokuapp.com/api/v1/person").then(function (response) {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then(function (json) {
            let html = '<div class="row"> '
            for (let s of json) {
               let n = s.name
               let su = s.surname
               let img = s.img
                let mat = s.matricola
                let img_circle = img.substr(0, 28);
                console.log(img_circle);
               img_circle += '_rounded.svg'
               let role = s.role
                //console.log(img);
               html += create(img_circle, n, su, role, mat)
               console.log(img_circle);

            }
            html += '</div>'
            $('#people-row').append(html)
            //console.log(json);
        });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}
  function create(img, n, su, role, mat) {
      return '<div class="col-lg-4 mb-4">'+
          '<div class="card h-100 text-center" style="border-radius: 15px"> ' +
          '<img class="card-img-top" alt="Missing" src='+ img + ' '+ 'height="250" style="padding-top: 20px">' +
          '<div class="card-body">' +
          '<h4 class="card-title">'+ n + ' '+ su + '</h4>' +
          '<p class="card-text">' + role + '</p>' +
          '<div class="text-center" style="margin-top: 20px;">' +
          '<a href="person.html?id='+ mat +'" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';

  }
