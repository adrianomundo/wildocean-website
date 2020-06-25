"use strict";

$(document).ready( () => {

     fetchServices();

});

async function fetchServices() {

    try {
        let promise = fetch("https://wildocean.herokuapp.com/api/v1/services").then( (response) => {
            if (!response.ok) {
                console.log("HTTPS API Error, status = " + response.status);
            }
            return response.json();
        }).then( (json) => {
            let html = "";
            let service_id, title, short_descr, images;
            for(let s of json) {
                service_id = s.service_id;
                title = s.title;
                short_descr = s.short_description;
                images = s.img;
                html += serviceCard()
                console.log(service_id);
                console.log(title);
                console.log(short_descr);
                console.log(images);
                console.log(images[0]);
            }
            $('#services').append(html);
            console.log(json);
        });
    }
    catch (e) {
        location.replace("../assets/pages/404.html");
        console.log(e);
    }

}

function serviceCard() {

    return `<div class="card lg-4 mb-4">
              <div class="row no-gutters">
                  <div class="col-md-5">
                      <img src="../assets/img/service/cleaning-the-ocean-service2.jpg" class="card-img" alt="service_1_img">
                  </div>
                  <div class="col-md-7">
                      <div class="card-body">
                          <h2 class="card-title" style="text-align: left; color: #0077C0; margin-bottom: 15px; margin-left: 30px;"><strong>Cleaning the ocean</strong></h2>
                          <p class="card-text" style="text-align: left; margin-left: 30px;">The ocean is big. Cleaning up the Great Pacific Garbage Patch using conventional methods –
                              vessels and nets – would take thousands of years and tens of billions of dollars to complete.</p>
                          <div class="row nopadding" style="margin-top: 0; margin-left: 0">
                              <div class="col-2">
                                  <i class="fa fa-map-signs" style="font-size: 36px;"></i>
                              </div>
                              <div class="col-2">
                                  <i class="fa fa-hand-grab-o" style="font-size: 36px;"></i>
                              </div>
                          </div>
                          <div class="text-left" style="margin-top: 20px; margin-left: 30px">
                              <button type="button" class="btn btn-outline-primary"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    `

    //console.log($("div")[0]);

}