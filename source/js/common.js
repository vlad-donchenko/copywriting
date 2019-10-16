var NAVBAR_HEIGHT = 56;
var ESC_KEYCODE = 27;
var closeModal = $('.modal__close');
var modal = $('.modal');
var menuButton = $('.site-header__menu-toggle');
var menu = $('.menu--header');
var menuWrap = $('.site-header');
var ModalButton = $('.button--call-modal');
menuWrap.removeClass('site-header--no-js');
menu.removeClass('menu--no-js');
var buttonConsultation = $('.button--consultation');
var consultationQuestions = $('#consultation_questions');

$(document).ready(function () {

  $('.tabs__wrap .tabs__link').click(function (evt) {
    evt.preventDefault();

    var tab_id = $(this).attr('data-tab');

    $('.tabs__wrap .tabs__link').removeClass('current-tabs');
    $('.tabs__content').removeClass('current-tabs');

    $(this).addClass('current-tabs');
    $("#" + tab_id).addClass('current-tabs');
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
      breakpoint: 1320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
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
  slideNumber = zeroSymbol + '' + slideNumber;

  if (slide === 0) {
    $('.arrows__counter').text(slideNumber);
  } else {
    $('.arrows__counter').text(slideNumber);
  }
};

var countSliderOdd = function (slide) {
  var slideNumber = slide + 1;
  var zeroSymbol = (slideNumber >= 10) ? '' : 0;
  slideNumber = zeroSymbol + '' + slideNumber;
  if (slide === 0) {
    $('.arrows__counter').text(slideNumber);
  } else {
    $('.arrows__counter').text(slideNumber);
  }
};

$('#reviews_slider').on('afterChange', function (event, slick, currentSlide) {
  if (slick.options.slidesToScroll % 2 === 0) {
    countSliderEven(currentSlide);
  } else {
    countSliderOdd(currentSlide);
  }
});

var onAnimateScrollClick = function () {
  var elementClick = $(this).attr("href");
  var destination = $(elementClick).offset().top - NAVBAR_HEIGHT;
  menuButton.removeClass('site-header__menu-toggle--open');
  menu.removeClass('menu--open');
  menuWrap.removeClass('site-header--menu-open');
  $('body').removeClass('overflow-hidden');
  $("html:not(:animated),body:not(:animated)").animate({
    scrollTop: destination
  }, 800);
  return false;
};

var onFixedMenu = function () {
  if ($(this).scrollTop() > NAVBAR_HEIGHT) {
    $('.site-header').addClass('site-header--fixed');
  } else if ($(this).scrollTop() <= NAVBAR_HEIGHT) {
    $('.site-header').removeClass('site-header--fixed');
  }
};

$('.menu__link').on('click', onAnimateScrollClick);
$(window).on('scroll', onFixedMenu);

var onCloseModal = function () {
  modal.removeClass('modal--open');
  $('body').removeClass('overflow-modal');
  $('.site-header--fixed').removeClass('site-header--modal');
  $(document).off('keydown', oncloseModalPress);
  $(document).off('click', onCloseModalBackgroundClick);
};

var oncloseModalPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !$(evt.target).is('.modal__input')) {
    onCloseModal();
    $(document).off('keydown', oncloseModalPress);
    $(document).off('click', onCloseModalBackgroundClick);
  }
};

var onCloseModalBackgroundClick = function (evt) {
  if ($(evt.target).is('.modal')) {
    onCloseModal()
  }
};

var onModalOpenClick = function (evt) {
  evt.preventDefault();
  var modalElement = $(this).attr("href");
  $(modalElement).addClass('modal--open');
  $('body').addClass('overflow-modal');
  $('.site-header--fixed').addClass('site-header--modal');
  closeModal.on('click', onCloseModal);
  $(document).on('keydown', oncloseModalPress);
  $(document).on('click', onCloseModalBackgroundClick);
};

var onMenuOpenClick = function () {
  menuButton.toggleClass('site-header__menu-toggle--open');
  menu.toggleClass('menu--open');
  menuWrap.toggleClass('site-header--menu-open');
  $('body').toggleClass('overflow-hidden');
};

var validationQuestion = function () {
  if (consultationQuestions.val().length > 5) {
    consultationQuestions.removeClass('consultation__input--error');
    buttonConsultation.on('click', onModalOpenClick);
  } else {
    consultationQuestions.addClass('consultation__input--error');
    buttonConsultation.off('click', onModalOpenClick);
  }
};

$(document).on('click', function (evt) {
  if ($(evt.target).is(consultationQuestions) || $(evt.target).is(buttonConsultation)) {
    consultationQuestions.on('input', function () {
      validationQuestion();
    });
  } else {
    consultationQuestions.removeClass('consultation__input--error');
  }
});

buttonConsultation.on('click', function () {
  validationQuestion();
});

ModalButton.on('click', onModalOpenClick);
menuButton.on('click', onMenuOpenClick);
