"use strict";

$(document).ready( () => {

    fetchServices();

});

async function fetchServices() {

    let services_response = (await fetch("https://wildocean.herokuapp.com/api/v1/services"));
    if (!services_response.ok) {
        console.log("HTTPS API Error, status = " + services_response.status);
        location.replace("../assets/pages/404.html");
    }
    let services = await services_response.json();

    let html = "";
    for(let service of services) {
        html += displayServiceCard(service);
    }
    $("#services").append(html);
    addIcons();

}

function displayServiceCard(service) {

    return `<div class="card lg-4 mb-4" style="border-radius: 10px;">
              <div class="row no-gutters">
                  <div class="col-md-5">
                      <img src="`+ service.img[0] +`" class="card-img" alt="service_img">
                  </div>
                  <div class="col-md-7">
                      <div class="card-body">
                          <h2 class="card-title" style="text-align: left; color: #0077C0; margin-bottom: 15px; margin-left: 30px;">`+ service.title +`</h2>
                          <p class="card-text" style="text-align: left; margin-left: 30px;">`+ service.short_description +`</p>
                          <div class="row nopadding" style="margin-top: 0; margin-left: 0">
                              <div class="col-2">
                                  <i class="" id="icon_1_service_`+service.service_id+`" style="font-size: 36px;"></i>
                              </div>
                              <div class="col-2">
                                  <i class="" id="icon_2_service_`+service.service_id+`" style="font-size: 36px;"></i>
                              </div>
                          </div>
                          <div class="text-left" style="margin-top: 20px; margin-left: 30px">
                              <a href="service.html?id=`+service.service_id+`" class="btn btn-outline-primary" role="button"><span style="font-size: 14px"><b>FIND OUT MORE</b></span></a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    `;
}

function addIcons() {

    $("#icon_1_service_1").addClass("fa fa-ship");
    $("#icon_2_service_1").addClass("fa fa-hand-grab-o");
    $("#icon_1_service_2").addClass("fa fa-anchor");
    $("#icon_2_service_2").addClass("fa fa-life-ring");
    $("#icon_1_service_3").addClass("fa fa-tint");
    $("#icon_2_service_3").addClass("fa fa-trash");
    $("#icon_1_service_4").addClass("fa fa-lock");
    $("#icon_2_service_4").addClass("fa fa-snowflake-o");


}

