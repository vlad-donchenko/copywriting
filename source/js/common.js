$(document).ready(function(){

  $('.tabs__wrap .tabs__link').click(function(evt){
    evt.preventDefault();

    var tab_id = $(this).attr('data-tab');

    $('.tabs__wrap .tabs__link').removeClass('current-tabs');
    $('.tabs__content').removeClass('current-tabs');

    $(this).addClass('current-tabs');
    $("#"+tab_id).addClass('current-tabs');
  });

  $('.arrows__counter').removeClass('arrows__counter--hidden');

});

$('#reviews_slider').slick({
  dots: false,
  infinite: false,
  speed: 700,
  adaptiveHeight: true,
  slidesToShow: 2,
  slidesToScroll: 2,
  prevArrow: $('.reviews__prev'),
  nextArrow: $('.reviews__next'),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

var countSliderEven = function (slide) {
  var slideNumber = slide / 2 + 1;
  var zeroSymbol = (slideNumber >= 10) ? '' : 0;
  slideNumber =  zeroSymbol + '' + slideNumber;

  if (slide === 0) {
    $('.arrows__counter').text(slideNumber);
  } else {
    $('.arrows__counter').text(slideNumber);
  }
};

var countSliderOdd = function (slide) {
  var slideNumber = slide + 1;
  var zeroSymbol = (slideNumber >= 10) ? '' : 0;
  slideNumber =  zeroSymbol + '' + slideNumber;

  if (slide === 0) {
    $('.arrows__counter').text( slideNumber);
    console.log('Потому что начало');
  } else {
    $('.arrows__counter').text(slideNumber);
  }
};

$('#reviews_slider').on('afterChange', function(event, slick, currentSlide){
  if (slick.options.slidesToScroll % 2 === 0) {
    countSliderEven(currentSlide);
  } else {
    countSliderOdd(currentSlide);
  }
});
