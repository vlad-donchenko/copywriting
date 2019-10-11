$(document).ready(function(){
  $('.tabs__wrap .tabs__link').click(function(evt){
    evt.preventDefault();

    var tab_id = $(this).attr('data-tab');

    $('.tabs__wrap .tabs__link').removeClass('current-tabs');
    $('.tabs__content').removeClass('current-tabs');

    $(this).addClass('current-tabs');
    $("#"+tab_id).addClass('current-tabs');
  })

})
