"use strict";

//$("#navbar").load("../pages/components/navbar.html");

$(document).ready( () => {

    loadNavbar();
    loadFooter();
    getSub();

});

function loadFooter() {

    let html = `<footer class="py-5 nopadding">
    <div class="container-full" >
        <div class="row">
            <div class="col md-6">
                <img src="../assets/img/logo.png" alt="Logo"  width="110" height="100">
            </div>
            <div class="col md-6">
                <p><span style="font-size: 13px">Via Edoardo Sagrada,46</span></p>
                <p><span style="font-size: 13px">Milano MI</span></p>
                <p><span style="font-size: 13px">+39.2.2399.3617</span></p>
                <p><span style="font-size: 13px">info@wildocean.com</span></p>
                <div  class="fa fa-instagram" ></div>
                <div  class="fa fa-facebook"></div>
                <div  class="fa fa-twitter"></div>
                <div  class="fa fa-linkedin"></div>
                <div  class="fa fa-youtube"></div>
            </div>
            <div class="col sm-6">
                <p style="padding: 10px;"><a class="footer-link" href="about.html"><b>About</b></a></p>
                <p style="padding: 10px;"><a class="footer-link" href="services.html"><b>Services</b></a></p>
                <p style="padding: 10px;"><a class="footer-link" href="crew.html"><b>Crew</b></a></p>
            </div>
            <div class="col sm-6">
                <p style="padding: 10px;"><a class="footer-link" href="events.html"><b>Events</b></a></p>
                <p style="padding: 10px;"><a class="footer-link" href="contact.html"><b>Contact</b></a></p>
            </div>
            <div class="col sm-6">
                <p style="padding: 5px;">Privacy Policy</p>
                <p style="padding: 5px;">Cookie Policy</p>
                <p style="padding: 5px;">Terms & Conditions</p>
            </div>
        </div>
    </div>
</footer>`;

    $("#footer").append(html);
}

function loadNavbar() {

    let html = `<nav class="navbar fixed-top navbar-expand-custom navbar- bg-white navbar-light" role="navigation" aria-label="main navigation">
        <a class="navbar-brand" href="../index.html"><img src="../assets/img/logo.png" alt="Logo" width="100px" height="auto"></a>
       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarResponsive">
        <ul class="navbar-nav w-100 justify-content-center">
          <li class="nav-item">
            <a class="nav-link nav-link-ltr" id="navAbout" href="about.html" style="color:black" >About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-ltr" id="navServices" href="services.html" style="color:black">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-ltr" id="navCrew" href="crew.html" style="color:black">Crew</a>
          </li>
           <li class="nav-item">
            <a class="nav-link nav-link-ltr" id="navEvents" href="events.html" style="color:black">Events</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-ltr" id="navContact" href="contact.html" style="color:black">Contact</a>
          </li>
           <li class="nav-item">
                <form class="form-inline">
                <i class="fa fa-search" aria-hidden="true" style="color:black"></i>
                <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search">
               </form>
          </li>
        </ul>
      </div>
  </nav>`;

    $("#navbar").append(html);
}

function getSub() {
    var title = document.title;
    if (title == 'Wild Ocean | About') {
        var element = document.getElementById("navAbout");
        element.classList.add("sub");
    }
    if (title == 'Wild Ocean | Services') {
        var element = document.getElementById("navServices");
        element.classList.add("sub");
    }
    if (title == 'Wild Ocean | Crew') {
        var element = document.getElementById("navCrew");
        element.classList.add("sub");
    }
    if (title == 'Wild Ocean | Events') {
        var element = document.getElementById("navEvents");
        element.classList.add("sub");
    }
    if (title == 'Wild Ocean | Contact') {
        var element = document.getElementById("navContact");
        element.classList.add("sub");
    }
}
