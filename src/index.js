import 'bootstrap';
import './sass/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import Blazy from 'blazy';

import LazyLoad from 'vanilla-lazyload';

var bLazy = new Blazy();
let navbarListItem = $('.navbar-center .nav-item');
let navbarListLink = $('.navbar-center .nav-item a');
let logo = $('.navbar-brand button');
let nav = '#navigation';

$(document).on(
  {
    mouseenter: function () {
      navbarListItem.removeClass('selected');
      $(this).addClass('selected');
    },
    mouseleave: function () {
      $(this).removeClass('selected');
    },
  },
  '.navbar-center .nav-item'
);

navbarListLink.on('click', function () {
  let id = $(this).attr('href');
  $('html, body').animate(
    {
      scrollTop: $(id).offset().top - $('.navbar-brand').height(),
    },
    800
  );
  if ($(window).width() < 998) {
    $('.navbar-collapse').removeClass('show');
  }
});

logo.on('mouseenter', function () {
  $(this).addClass('active');
  if ($(this).attr('aria-expanded') == 'true') {
    $(this).removeClass('active');
  }
});
logo.on('click mouseleave', function () {
  $(this).removeClass('active');
});

$('.scroll-top').on('click', function () {
  navbarListItem.removeClass('active selected');
  navbarListItem.first().addClass('active');
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  return false;
});

stickyNav();

$(document).ready(function () {
  $(window).scroll(function () {
    stickyNav();
  });
});

function stickyNav() {
  if ($(window).scrollTop() > 19) {
    $(nav).addClass('nav--section-sticky');
  } else {
    $(nav).removeClass('nav--section-sticky');
  }
}
