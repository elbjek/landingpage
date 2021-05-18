import './sass/main.scss';
import 'bootstrap';

$('.navbar-toggler').on('click', function() {
    if($(this).attr('aria-expanded','false')) {
        $('.navbar-toggler-icon').toggleClass('navbar-toggler-icon-close');
    }
})