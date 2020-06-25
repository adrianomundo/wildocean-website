"use strict";

//$("#navbar").load("../pages/components/navbar.html");

$(document).ready( () => {

    loadFooter();

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
        <p class="m-0 text-center text-black"> &copy;<span style="font-size: 13px"> Wild Ocean | 21/04/2013</span></p>
    </div>
</footer>`;

    $("#footer").append(html);
}
