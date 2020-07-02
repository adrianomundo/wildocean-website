"use strict";

$(document).ready( () => {


    var title = document.title;
    if (title == 'Wild Ocean | Home') {
    navEffect();
    }
    if (title == 'Wild Ocean | About') {
    numbCounter();
    }

});

function navEffect() {

$(window).scroll(function () {
    if($(this).scrollTop() > $('nav').height()){
        $('#index_nav').addClass('scrolled');
    }
    else {
        $('#index_nav').removeClass('scrolled');
    }
});

}


function numbCounter() {

$(window).on('scroll', function() {
 if($(this).scrollTop() > $("#value_section").offset().top ){
   $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
  });
 $(window).off('scroll');
 }
});

}

//goes on top of the page
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


//effect of the scroll-up blue button
var mybutton = document.getElementById("onTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.opacity = "1";
  } else {
    mybutton.style.opacity = "0";
  }
}
