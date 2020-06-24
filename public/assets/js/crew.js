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
            let html = ""
            for (let s of json) {
               let n = s.name
               let su = s.surname
               let img = s.img
               let id = s.role
               html += create(img, n, su, id)
              //  console.log(json);
            }
            $('#people-row').append(html)
            console.log(json);
        });

    }
    catch (e) {
        location.replace("./404.html");
        console.log(e);
    }

}
  function create(img, n, su, id) {
      return '<div class="col-lg-4 mb-4">'+
          '<div class="card h-100 text-center">'+
          '<img class="card-img-top" src='+ img + 'alt="Missing">' +
          '<div class="card-body">' +
          '<h4 class="card-title">'+ n + ' '+ su + '</h4>' +
          '<p class="card-text">' + id + '</p>' +
          '<button type="button" class="btn btn-link">SEE MORE</button>' +
          '</div>' +
          '</div>' +
          '</div>'

  }
//function append_person(img, name, surname, id){
    //return $('<div class="col-lg-4 mb-4">  <div class="card h-100 text-center">').append(
      //  $('<img class="card-img-top" alt="Missing" src="' + img + '">'),
        //$(` <div class="card-body">`).append(
          //  $(' <h4 class="card-title">' +name+' </h4>'), $(' </div> </div> </div>')
       // )
    //);
//}