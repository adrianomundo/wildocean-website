"use strict";

$(document).ready( () => {


    var title = document.title;
    if (title == 'Wild Ocean | Home') {
    navEffect();
    }
    if (title == 'Wild Ocean | About') {
    numbCounter();
    }
//    upButton();

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

//function upButton() {
//
//var mybutton = $("#onTopBtn");
//
//$(window).onscroll(function() {
//
//  if (document.body.scrollTop > $("#learn_more").offset().top || document.documentElement.scrollTop > $("#learn_more").offset().top) {
//    mybutton.style.display = "block";
//  } else {
//    mybutton.style.display = "none";
//  }
//})
//
//}
//
//function topFunction() {
//  document.body.scrollTop = 0;
//  document.documentElement.scrollTop = 0;
//}
