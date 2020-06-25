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
            let service_id, title, short_descr, images, first_img;
            for(let s of json) {
                service_id = s.service_id;
                title = s.title;
                short_descr = s.short_description;
                images = s.img;
                first_img = images[0];
                html += serviceCard(service_id, title, short_descr, first_img)
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

function serviceCard(service_id, title, short_descr, image) {

    return `<div class="card lg-4 mb-4" style="border-radius: 10px;">
              <div class="row no-gutters">
                  <div class="col-md-5">
                      <img src="`+ image +`" class="card-img" alt="service_img">
                  </div>
                  <div class="col-md-7">
                      <div class="card-body">
                          <h2 class="card-title" style="text-align: left; color: #0077C0; margin-bottom: 15px; margin-left: 30px;"><strong>`+ title +`</strong></h2>
                          <p class="card-text" style="text-align: left; margin-left: 30px;">`+ short_descr +`</p>
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
    `;
}